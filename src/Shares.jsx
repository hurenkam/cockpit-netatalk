import React from 'react';
import {
    Card, CardBody, CardHeader, CardActions, CardTitle, Text, TextVariants, Toolbar, ToolbarContent, ToolbarItem, Button
} from '@patternfly/react-core';

import { ListingTable } from "cockpit-components-table.jsx";
import './Shares.css';
import ShareActions from "./ShareActions.jsx";

import cockpit from 'cockpit';
const _ = cockpit.gettext;

export default class Shares extends React.Component {
    constructor(props) {
        console.log("Shares.constructor()");
        super(props);
        this.state = {
            width: 0,
            handler: props.handler,
            showCreateShareModal: false
        };

        this.cardRef = React.createRef();
    }

    renderToolbar() {
        console.log("Shares.renderToolbar()");
        return (
            <Toolbar>
                <ToolbarContent>
                    <ToolbarItem>
                        <Button
                            variant="secondary"
                            key="get-new-image-action"
                            id="shares-shares-edit-settings-btn"
                            onClick={() => this.setState({ showCreateShareModal: true })}
                        >
                            {_("Edit Global Settings")}
                        </Button>
                    </ToolbarItem>
                    <ToolbarItem>
                        <Button
                            variant="secondary"
                            key="get-new-image-action"
                            id="shares-shares-create-share-btn"
                            onClick={() => this.setState({ showCreateShareModal: true })}
                        >
                            {_("Create Share")}
                        </Button>
                    </ToolbarItem>
                </ToolbarContent>
            </Toolbar>
        );
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
            { title: key },
            { title: section.path },
            {
                title: <ShareActions share={key} handler={this.state.handler} />,
                props: { className: 'pf-c-table__action content-action' }
            },
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
        console.log("Shares.render()");
        const sections = this.state.handler.getSections();
        const shares = this.state.handler.getShareKeys();

        const title = "Apple File Protocol Configuration";
        const toolbar = this.renderToolbar();
        const emptyCaption = "no shares";
        const columnTitles = [
            { title: "Share Name" },
            { title: "Path" }
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
        const card = (
            <Card id="shares" className="shares">
                <CardHeader>
                    <CardTitle><Text component={TextVariants.h2}>{_(title)}</Text></CardTitle>
                    <CardActions>{toolbar}</CardActions>
                </CardHeader>
                <CardBody>
                    {cardBody}
                </CardBody>
            </Card>
        );

        return <div ref={this.cardRef}>{card}</div>;
    }
}
