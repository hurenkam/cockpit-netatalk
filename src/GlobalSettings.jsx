import React from 'react';
import {
    Card, CardBody, CardHeader, CardTitle,
} from '@patternfly/react-core';
import { ListingTable } from "cockpit-components-table.jsx";

export default class GlobalSettings extends React.Component {
    constructor(props) {
        console.log("GlobalSettings.constructor()");
        super(props);
        this.state = {
            width: 0,
            handler: props.handler
        };

        this.cardRef = React.createRef();
    }

    renderProperty(key, value) {
        console.log("GlobalSettings.renderProperty()");
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

    renderCard() {
        console.log("GlobalSettings.renderCard()");
        const emptyCaption = "no properties";
        const columnTitles = [
            { title: "Property" },
            { title: "Value" }
        ];

        const properties = this.state.handler.getSection("Global");
        // const properties = {};
        console.log("GlobalSettings.renderCard() properties: ", properties);
        const keys = properties ? Object.keys(properties) : [];
        const rows = keys.map(key => this.renderProperty(key, properties[key]));

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

    render() {
        console.log("GlobalSettings.render()");
        const title = "Global Settings";
        const cardBody = this.renderCard();
        const card = (
            <Card id="globalsettings" className="globalsettings">
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardBody>
                    {cardBody}
                </CardBody>
            </Card>
        );

        return <div ref={this.cardRef}>{card}</div>;
    }
}
