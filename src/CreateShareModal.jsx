import React from 'react';
import {
    Button,
    Checkbox,
    Flex,
    Form,
    FormGroup,
    Modal,
    TextInput
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
            shareName: "",
            path: "",
            timeMachine: false,
            users: "",
            limit: "0"
        };

        this.cardRef = React.createRef();
    }

    onValueChanged(key, value) {
        this.setState({ [key]: value });
    }

    renderForm() {
        console.log("CreateShareModal.renderForm()");
        const dialogValues = this.state;
        return (
            <Form>
                <Flex className="create-share-dialog-header pf-c-form pf-m-horizontal" justifyContent={{ default: 'justifyContentSpaceBetween' }}>
                    <FormGroup fieldId='create-share-dialog-name' label={_("Name")}>
                        <TextInput
                           id='create-share-dialog-name'
                           className="share-name"
                           placeholder={_("Share name")}
                           value={dialogValues.shareName}
                           onChange={value => this.onValueChanged('shareName', value)}
                        />
                    </FormGroup>
                    <FormGroup fieldId='create-share-dialog-users' label={_("Users")}>
                        <TextInput
                           id='create-share-dialog-users'
                           className="users"
                           placeholder={_("Users")}
                           value={dialogValues.users}
                           onChange={value => this.onValueChanged('users', value)}
                        />
                    </FormGroup>
                    <FormGroup fieldId='create-share-dialog-path' label={_("Path")}>
                        <TextInput
                           id='create-share-dialog-path'
                           className="path"
                           placeholder={_("Path")}
                           value={dialogValues.path}
                           onChange={value => this.onValueChanged('path', value)}
                        />
                    </FormGroup>
                    <FormGroup fieldId="create-share-dialog-timemachine">
                        <Checkbox
                            isChecked={dialogValues.timeMachine}
                            id="create-share-dialog-timemachine"
                            onChange={value => this.onValueChanged('timeMachine', value)}
                            label={_("Time Machine")}
                        />
                    </FormGroup>
                    <FormGroup fieldId='create-share-dialog-limit' label={_("Volume size limit")}>
                        <TextInput
                           id='create-share-dialog-limit'
                           className="limit"
                           placeholder={_("Volume size limit")}
                           value={dialogValues.limit}
                           onChange={value => this.onValueChanged('limit', value)}
                        />
                    </FormGroup>
                </Flex>
            </Form>
        );
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
                            onClick={this.props.close}
                        >
                            {_("Cancel")}
                        </Button>
                    </>
                }
            >
                {this.renderForm()}
            </Modal>
        );
    }
}
