import React from 'react';
import {
    Dropdown,
    DropdownItem,
    KebabToggle,
} from '@patternfly/react-core';
import EditShareModal from "./EditShareModal.jsx";

import cockpit from 'cockpit';
const _ = cockpit.gettext;

export default class ShareActions extends React.Component {
    constructor(props) {
        console.log("ShareActions.constructor()");
        super(props);
        this.state = {
            width: 0,
            share: props.share,
            handler: props.handler,
            isKebabOpen: false,
            isEditShareModalOpen: false
        };

        this.cardRef = React.createRef();
    }

    onKebabToggle() {
        this.setState({ isKebabOpen: (!this.state.isKebabOpen) });
    }

    render() {
        const actions = (
            <Dropdown
                toggle={<KebabToggle onToggle={() => this.onKebabToggle() } />}
                isOpen={this.state.isKebabOpen}
                isPlain
                position="right"
                dropdownItems={[
                    <DropdownItem
                        key={this.state.share + "edit"}
                        component="button"
                        onClick={() => this.setState({ isEditShareModalOpen: true })}
                    >
                        {_("Edit")}
                    </DropdownItem>,
                    <DropdownItem
                        key={this.state.share + "delete"}
                        component="button"
                        className="pf-m-danger btn-delete"
                    >
                        {_("Delete")}
                    </DropdownItem>
                ]}
            />
        );

        console.log("ShareActions.render()  Share: ", this.state.share);
        return (
            <>
                {actions}
                {this.state.isEditShareModalOpen &&
                <EditShareModal
                    share={this.state.share}
                    handler={this.state.handler}
                    close={() => this.setState({ isEditShareModalOpen: false })}
                /> }
            </>
        );
    }
}
