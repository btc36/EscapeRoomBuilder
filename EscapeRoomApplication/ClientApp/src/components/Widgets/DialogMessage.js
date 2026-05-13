import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

export class DialogMessage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { isErrorMessage, dialogFullScreen, closeDialog, showDialog,
                disableEscapeKeyDown, actionDialog, dialogTitle, dialogContent } = this.props;
        return (
            <Modal
                className={`${isErrorMessage ? "errorMessage" : ""} ${dialogFullScreen ? "modal-fullscreen" : ""}`}
                isOpen={showDialog}
                toggle={actionDialog ? undefined : () => closeDialog(false)}
                keyboard={!disableEscapeKeyDown}
                backdrop={actionDialog ? 'static' : true}
            >
                <ModalHeader toggle={actionDialog ? undefined : () => closeDialog(false)}>
                    {dialogTitle}
                </ModalHeader>
                <ModalBody>
                    {dialogContent}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => closeDialog(false)}>
                        {actionDialog ? 'Cancel' : 'OK'}
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}
