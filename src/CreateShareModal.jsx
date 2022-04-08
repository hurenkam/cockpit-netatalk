import React from 'react';
import {
    Button,
    Modal
} from '@patternfly/react-core';

import cockpit from 'cockpit';
const _ = cockpit.gettext;

export default class CreateShareModal extends React.Component {
    constructor(props) {
        console.log("CreateShareModal.constructor()");
        super(props);
        this.state = {
            width: 0,
            handler: props.handler,
        };

        this.cardRef = React.createRef();
    }

    render () {
        console.log("CreateShareModal.render()");
        return (
            <Modal
                isOpen
                onClose={this.props.close}
                position="top"
                variant="medium"
                title={_("Create Share")}
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
                        >
                            {_("Cancel")}
                        </Button>
                    </>
                }
            />
        );
    }
}
