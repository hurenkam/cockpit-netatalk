import React from 'react';
import {
    Button,
} from '@patternfly/react-core';
import {
    IoAddSharp,
    IoTrashSharp
} from "react-icons/io5";
import {
    ListingTable
} from "cockpit-components-table.jsx";
import './PropertyList.css';

import cockpit from 'cockpit';
const _ = cockpit.gettext;

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

    renderAddButton() {
        return (
            <Button
                className='button-solid'
                position='right'
                variant='plain'
                id="btn-close"
                isSmall
                aria-label={_("Add item")}
                icon={<IoAddSharp size="22" />}
            />
        );
    }

    renderDeleteButton(key) {
        return (
            <Button
                className='button-solid'
                position='right'
                variant='plain'
                id={key + "-btn-close"}
                isSmall
                aria-label={_("Remove item")}
                icon={<IoTrashSharp size="22" color="red" />}
            />
        );
    }

    renderProperty(key, value) {
        console.log("Properties.renderProperty()");
        const columns = [
            { title: key },
            { title: value },
            {
                title: this.renderDeleteButton(key),
                props: { className: 'pf-c-table__action content-action' }
            }
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
            { title: "Value" },
            {
                title: this.renderAddButton(),
                props: { className: 'pf-c-table__action content-action' }
            }
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
