import React from 'react';
import {
    Card, CardBody, CardHeader, CardActions, CardTitle, Text, TextVariants, Toolbar, ToolbarContent, ToolbarItem, Button
} from '@patternfly/react-core';
import {
    BiFolderPlus, BiCog
} from "react-icons/bi";

import { ListingTable } from "cockpit-components-table.jsx";
import './Shares.css';
import ShareActions from "./ShareActions.jsx";
import CreateShareModal from "./CreateShareModal.jsx";
import EditGlobalSettingsModal from "./EditGlobalSettingsModal.jsx";

import cockpit from 'cockpit';
const _ = cockpit.gettext;

export default class Shares extends React.Component {
    constructor(props) {
        console.log("Shares.constructor()");
        super(props);
        this.state = {
            width: 0,
            handler: props.handler,
            showEditGlobalSettingsModal: false,
            showCreateShareModal: false
        };

        this.cardRef = React.createRef();
    }

    renderSettingsButton() {
        return (
            <Button
                className='button-solid'
                position='right'
                variant='plain'
                id="btn-close"
                isSmall
                aria-label={_("Add item")}
                icon={<BiCog size="22" />}
                onClick={() => this.setState({ showEditGlobalSettingsModal: true })}
            />
        );
    }

    renderAddFolderButton() {
        return (
            <Button
                className='button-solid'
                position='right'
                variant='plain'
                id="btn-close"
                isSmall
                aria-label={_("Add item")}
                icon={<BiFolderPlus size="22" />}
                onClick={() => this.setState({ showCreateShareModal: true })}
            />
        );
    }

    renderToolbar() {
        console.log("Shares.renderToolbar()");
        return (
            <Toolbar>
                <ToolbarContent>
                    <ToolbarItem>
                        {this.renderSettingsButton()}
                    </ToolbarItem>
                </ToolbarContent>
                {this.state.showCreateShareModal &&
                <CreateShareModal
                    handler={this.state.handler}
                    close={() => this.setState({ showCreateShareModal: false })}
                /> }
                {this.state.showEditGlobalSettingsModal &&
                <EditGlobalSettingsModal
                    handler={this.state.handler}
                    close={() => this.setState({ showEditGlobalSettingsModal: false })}
                /> }
            </Toolbar>
        );
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
            { title: "Path" },
            {
                title: this.renderAddFolderButton(),
                props: { className: 'pf-c-table__action content-action' }
            }
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
