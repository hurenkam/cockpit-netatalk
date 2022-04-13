import cockpit from 'cockpit';

export default class UsersAndGroupsHandler {
    content = "default";
    users = {};
    groups = {};
    onUpdateUsers;
    onUpdateGroups;

    constructor(onupdateusers, onupdategroups) {
        console.log("UsersAndGroupsHandler.constructor()");
        this.onUpdateUsers = onupdateusers;
        this.onUpdateGroups = onupdategroups;

        cockpit.file('/etc/passwd').watch(content => {
            this.updateUsers(content);
        });

        cockpit.file('/etc/groups').watch(content => {
            this.updateGroups(content);
        });
    }

    updateUsers(content) {
        console.log("UsersAndGroupsHandler.updateUsers()");
        this.users = {};
        const getusers = cockpit.spawn(["getent", "passwd"], { err: "out" });
        getusers.done(content => {
            const entries = content.split("\n").sort();
            entries.forEach(entry => {
                const fields = entry.split(":");
                const user = fields[0];
                const uid = parseInt(fields[2]);
                if (uid >= 1000) {
                    this.users[user] = uid;
                }
            });

            if (this.onUpdateUsers) this.onUpdateUsers(Object.keys(this.users));
        });
    }

    updateGroups(content) {
        console.log("UsersAndGroupsHandler.updateGroups()");
        this.groups = {};
        const getgroups = cockpit.spawn(["getent", "passwd"], { err: "out" });
        getgroups.done(content => {
            const entries = content.split("\n").sort();
            entries.forEach(entry => {
                const fields = entry.split(":");
                const group = fields[0];
                const gid = parseInt(fields[2]);
                if (gid >= 1000) {
                    this.groups[group] = gid;
                }
            });

            if (this.onUpdateGroups) this.onUpdateGroups(Object.keys(this.groups));
        });
    }
}
