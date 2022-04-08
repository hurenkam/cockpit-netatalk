import React from 'react';
import {
    Card, CardBody, CardHeader, CardTitle
} from '@patternfly/react-core';

import { ListingTable } from "cockpit-components-table.jsx";
import ShareDetails from "./ShareDetails.jsx";

export default class Shares extends React.Component {
    constructor(props) {
        console.log("Shares.constructor()");
        super(props);
        this.state = {
            width: 0,
            handler: props.handler
        };

        this.cardRef = React.createRef();
    }

    renderProperty(key, value) {
        console.log("Shares.renderProperty()");
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

    renderRow(key, section) {
        console.log("Shares.renderRow()");
        const columns = [
            { title: key }
        ];
        const shareDetails = (
            <ShareDetails share={key} properties={section} />
        );
        return {
            expandedContent: shareDetails,
            columns: columns,
            props: {
                key : key,
                "data-row-id": key,
            },
        };
    }

    render() {
        const sections = this.state.handler.getSections();
        const shares = this.state.handler.getShareKeys();

        const emptyCaption = "no shares";
        const columnTitles = [
            // { title: "Share" }
        ];
        const shareRows = shares.map(id => this.renderRow(id, sections[id]));
        const cardBody = (
            <ListingTable
                    aria-label="Title"
                    variant='compact'
                    emptyCaption={emptyCaption}
                    columns={columnTitles}
                    rows={shareRows}
            />
        );
        const title = "Shares";
        const card = (
            <Card id="shares" className="shares">
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
