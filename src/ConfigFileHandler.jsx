import cockpit from 'cockpit';

export default class ConfigFileHandler {
    content = "default";
    sections = {}
    onUpdate;

    constructor(onupdate) {
        console.log("ConfigFileHandler.constructor()");
        this.onUpdate = onupdate;

        cockpit.file('/etc/netatalk/afp.conf').watch(content => {
            this.setContent(content);
        });
    }

    setContent(content) {
        console.log("ConfigFileHandler.setContent()");
        this.content = content;
        const lines = content.split(/\r?\n/);
        let section;
        this.sections = {};

        lines.forEach((line) => {
            const stripped = line.trim();
            if ((stripped[0] === "[") && (stripped[stripped.length - 1] === "]")) {
                section = stripped.substring(1, stripped.length - 1);
                console.log("ConfigFileHandler.setContent(): Found section: " + section);
            } else {
                if (section !== undefined) {
                    if (!(section in this.sections)) {
                        this.sections[section] = {};
                    }

                    if ((stripped !== "") && (stripped[0] !== '#') && (stripped[0] !== ';')) {
                        const keyvaluepair = stripped.split('=');
                        const key = keyvaluepair[0].trim();
                        const value = keyvaluepair[1].trim();
                        this.sections[section][key] = value;
                        console.log("ConfigFileHandler.setContent(): Adding property '" + key + "' with value '" + value + "' to section: " + section);
                    }
                }
            }
        });

        if (this.onUpdate) this.onUpdate();
    }

    getContent() {
        console.log("ConfigFileHandler.getContent()");
        return this.content;
    }

    getSections() {
        console.log("ConfigFileHandler.getSections()");
        return this.sections;
    }

    getSection(key) {
        console.log("ConfigFileHandler.getSection(" + key + ")");
        return this.sections[key];
    }

    getShareKeys() {
        console.log("ConfigFileHandler.getSectionKeys()");
        console.log(this.sections);
        return Object.keys(this.sections)
                .filter(key => { return key !== "Global" })
                .sort();
    }
}
