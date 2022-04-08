import React from 'react';
import {
    Button,
    Modal
} from '@patternfly/react-core';
import PropertyList from './PropertyList.jsx';

import cockpit from 'cockpit';
const _ = cockpit.gettext;

export default class EditGlobalSettingsModal extends React.Component {
    constructor(props) {
        console.log("EditGlobalSettingsModal.constructor()");
        super(props);
        this.state = {
            width: 0,
            handler: props.handler,
        };

        this.cardRef = React.createRef();
    }

    render () {
        console.log("EditGlobalSettingsModal.render()");
        return (
            <Modal
                isOpen
                onClose={this.props.close}
                position="top"
                variant="medium"
                title={_("Edit Global Settings")}
                footer={
                    <>
                        <Button
                            variant='primary'
                            isDisabled={false}
                        >
                            {_("Confirm")}
                        </Button>
                        <Button
                            variant='link'
                            className='btn-cancel'
                            onClick={this.props.close}
                        >
                            {_("Cancel")}
                        </Button>
                    </>
                }
            >
                <PropertyList
                    section="Global"
                    handler={this.state.handler}
                />
            </Modal>
        );
    }
}
