import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

export class DialogMessage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Dialog
                className={this.props.isErrorMessage ? "errorMessage" : this.props.dialogFullScreen ? "fullscreen" : ""}
                dialogFullScreen={this.props.dialogFullScreen}
                onClose={this.props.closeDialog}
                aria-labelledby="customized-dialog-title"
                open={this.props.showDialog}
                disableEscapeKeyDown={this.props.actionDialog}
            >
                <DialogTitle id="customized-dialog-title" onClose={this.props.closeDialog}>
                    {this.props.dialogTitle}
        </DialogTitle>
                <DialogContent dividers>
                    {this.props.dialogContent}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { this.props.closeDialog(false)}} color="primary">
                        {this.props.actionDialog ? 'Cancel' : 'OK'}
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
