import React from 'react';
import { ListingTable } from "cockpit-components-table.jsx";

export default class PropertyList extends React.Component {
    constructor(props) {
        console.log("Properties.constructor()  Section: " + props.section);
        super(props);
        this.state = {
            width: 0,
            title: props.title,
            section: props.section,
            handler: props.handler,
            properties: props.handler.getSection(props.section)
        };

        this.cardRef = React.createRef();
    }

    renderProperty(key, value) {
        console.log("Properties.renderProperty()");
        const columns = [
            { title: key },
            { title: value }
        ];

        return {
            columns: columns,
            props: {
                key : key,
                "data-row-id": key,
            },
        };
    }

    render() {
        console.log("Properties.render()  Section: ", this.state.section);
        const emptyCaption = "no properties";
        const columnTitles = [
            { title: "Property" },
            { title: "Value" }
        ];

        const keys = Object.keys(this.state.properties);
        const rows = keys.map(key => this.renderProperty(key, this.state.properties[key]));

        return (
            <ListingTable
                    aria-label="Title"
                    variant='compact'
                    emptyCaption={emptyCaption}
                    columns={columnTitles}
                    rows={rows}
            />
        );
    }
}
