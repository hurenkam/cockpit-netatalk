import React from 'react';
import {
    Card, CardBody, CardHeader, CardActions, CardTitle, Text, TextVariants, Toolbar, ToolbarContent, ToolbarItem, Button
} from '@patternfly/react-core';
import { ListingTable } from "cockpit-components-table.jsx";

import cockpit from 'cockpit';
const _ = cockpit.gettext;

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

    renderToolbar() {
        return (
            <Toolbar>
                <ToolbarContent>
                    <ToolbarItem>
                        <Button
                            variant="primary"
                            key="create-property-action"
                            id="globalsettings-globalsettings-create-property-btn"
                            onClick={() => this.setState({ showCreateShareModal: true })}
                        >
                            {_("+")}
                        </Button>
                    </ToolbarItem>
                </ToolbarContent>
            </Toolbar>
        );
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
        const toolbar = this.renderToolbar();
        const cardBody = this.renderCard();
        const card = (
            <Card id="globalsettings" className="globalsettings">
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
