import React from 'react';
import { ListingTable } from "cockpit-components-table.jsx";

export default class ShareDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            share: props.share,
            properties: props.properties
        };

        this.cardRef = React.createRef();
        console.log("ShareDetails.constructor()");
    }

    renderProperty(key, value) {
        console.log("ShareDetails.renderProperty()");
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
        console.log("ShareDetails.render()  Share: ", this.state.share);
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
