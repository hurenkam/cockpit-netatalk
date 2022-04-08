import React from 'react';
import {
    Button,
    Modal
} from '@patternfly/react-core';
import PropertyList from './PropertyList.jsx';

import cockpit from 'cockpit';
const _ = cockpit.gettext;

export default class EditShareModal extends React.Component {
    constructor(props) {
        console.log("EditShareModal.constructor()");
        super(props);
        this.state = {
            width: 0,
            share: props.share,
            handler: props.handler,
        };

        this.cardRef = React.createRef();
    }

    render () {
        console.log("EditShareModal.render()");
        return (
            <Modal
                isOpen
                onClose={this.props.close}
                position="top"
                variant="medium"
                title={_("Edit Share: ") + this.state.share}
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
                    section={this.state.share}
                    handler={this.state.handler}
                />
            </Modal>
        );
    }
}
