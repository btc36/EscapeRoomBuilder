import React, { Component } from 'react';
import { FrontEndDAO } from '../../FrontEndDAO';
import { DataEntry } from '../SubComponents/BuildGame/DataEntry';
import { DialogMessage } from '../Widgets/DialogMessage';
import { Loader } from '../Widgets/Loader';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { PageLink } from '../SubComponents/PageLink';

export class Locks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            locks: [],
            lockTypes: [],
            showDialog: false,
            dialogTitle: "",
            dialogContent: "",
            actionDialog: false,
            isErrorMessage: false,
            editData: {
                additionalInputs: {
                    combo: ""
                },
                additionalSelections: {
                    lockType: {
                        value: "",
                        selectionList: [],
                        id: "id_lock_types",
                        title: "Lock Type"
                    }
                }
            },
            editing: true,
            loading: false,
        }
        this.startLoading = this.startLoading.bind(this);
        this.stopLoading = this.stopLoading.bind(this);
        this.showConfirm = this.showConfirm.bind(this);
        this.getLocks = this.getLocks.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.updateEditData = this.updateEditData.bind(this);
        this.addLine = this.addLine.bind(this);
        this.removeLineConfirm = this.removeLineConfirm.bind(this);
        this.removeLine = this.removeLine.bind(this);
        this.editLine = this.editLine.bind(this);
        this.editLineCallback = this.editLineCallback.bind(this);
        this.submitLineEntry = this.submitLineEntry.bind(this);
        this.submitLineEntryCallback = this.submitLineEntryCallback.bind(this);
        this.getLocks();
    }

    startLoading() {
        setTimeout(() => {
            this.setState({
                loading: true
            })
        })
    }

    stopLoading() {
        this.setState({
            loading: false
        })
    }

    showConfirm(title, message, buttonTextPositive, buttonTextNegative, positiveFunction, negativeFunction, hideSubmit = false) {
        var buttons = [{
            label: buttonTextNegative,
            onClick: negativeFunction
        }];
        if (!hideSubmit) {
            buttons.push({
                label: buttonTextPositive,
                onClick: positiveFunction
            });
        }

        const options = {
            title: title,
            message: message,
            buttons: buttons,
            childrenElement: () => <div />,
            closeOnEscape: false,
            closeOnClickOutside: false,
            willUnmount: () => { },
            afterClose: () => { },
            onClickOutside: () => { },
            onKeypressEscape: () => { },
            overlayClassName: "confirm-message"
        };

        confirmAlert(options);
    }

    async getLocks() {
        var gameInfo = await this.props.FrontEndDAO.getLocks();
        var editData = this.state.editData;
        editData.additionalSelections.lockType.selectionList = gameInfo.lockTypes;
        this.setState({
            locks: gameInfo.locks,
            lockTypes: gameInfo.lockTypes,
            editData: editData
        })
    }

    closeDialog(a, b) {
        this.setState({
            showDialog: false
        });
    }

    updateEditData(e, inputName,inputType) {
        console.log("E", e);
        var editData = this.state.editData;
        if (inputType == "extraInput") {
            editData.additionalInputs[inputName] = e.target.value;
        }
        else if (inputType == "selection") {
            editData.additionalSelections[inputName].value = e.target.value;
        }
        else {
            editData[inputName] = e.target.value;
        }
        this.setState({
            editData: editData
        });
        if (this.state.editing) {
            setTimeout(this.editLineCallback);
        }
        else {
            setTimeout(this.addLine);
        };
    }

    addLine() {
        console.log("ADD LINE STATE", this.state);
        this.setState({
            showDialog: true,
            dialogFullScreen: true,
            actionDialog: true,
            editing: false,
            dialogContent: <DataEntry
                editData={this.state.editData}
                updateEditData={this.updateEditData}
                submitLineEntry={this.submitLineEntry}
            />
        })
    }

    removeLineConfirm(removeData) {
        this.showConfirm(
            "Remove Lock",
            "Are you sure you want to remove " + removeData.name + "? This cannot be reversed",
            "Remove Lock",
            "Just Kidding",
            () => { this.removeLine(removeData) },
            () => { }
        );
    }

    async removeLine(removeData) {
        var removelineResponse = await this.props.FrontEndDAO.removeLock(removeData.lineId);
        if (removelineResponse.success) {
            this.setState({
                locks: removelineResponse.locks
            })
        }
        else {
            alert("THERE HAS BEEN AN ERROR", removelineResponse);
        }
    }

    editLine(editData) {
        console.log("EDIT DATA", editData);
        this.setState({
            editData: editData
        })
        setTimeout(this.editLineCallback);
    }

    editLineCallback() {
        this.setState({
            showDialog: true,
            dialogFullScreen: true,
            actionDialog: true,
            editing: true,
            dialogContent: <DataEntry
                editData={this.state.editData}
                updateEditData={this.updateEditData}
                submitLineEntry={this.submitLineEntry}
            />
        })
    }

    submitLineEntry() {
        var editData = this.state.editData;
        if (!editData.name || !editData.description || !editData.additionalInputs.combo || !editData.additionalSelections.lockType.value) {
            alert('You cannot have empty values');
            return;
        }
        this.startLoading();
        setTimeout(this.submitLineEntryCallback)
    }

    async submitLineEntryCallback() {
        if (this.state.editing) {
            var updateResponse = await this.props.FrontEndDAO.updateLock(this.state.editData);
        }
        else {
            var updateResponse = await this.props.FrontEndDAO.addLock(this.state.editData);
        }
        console.log("LOCK TYPES RESPONSE", updateResponse)
        if (updateResponse.success) {
            this.setState({
                locks: updateResponse.locks
            })
        }
        else {
            alert("THERE WAS AN ERROR", updateResponse)
        }
        this.setState({
            editData: {
                name: "",
                description: "",
                additionalInputs: {
                    combo: ""
                },
                additionalSelections: {
                    lockType: {
                        value: "",
                        id: "id_lock_types",
                        selectionList: this.state.lockTypes,
                        title: "Lock Type"
                    }
                }
            },
            showDialog: false,
            dialogTitle: "",
            dialogContent: "",
            actionDialog: false,
            isErrorMessage: false,
            loading: false
        })
    }



    render() {
        console.log("Locks STATE", this.state);
        var editLineFunction = this.editLine;
        var removeLineFunction = this.removeLineConfirm;
        var lockTypes = this.state.lockTypes;
        return (
            <div className="escapeRoomPage">
                {
                    this.state.loading
                    &&
                    <Loader />
                }
                <DialogMessage
                    closeDialog={this.closeDialog}
                    showDialog={this.state.showDialog}
                    dialogTitle={this.state.dialogTitle}
                    dialogContent={this.state.dialogContent}
                    actionDialog={this.state.actionDialog}
                    isErrorMessage={this.state.isErrorMessage}
                    dialogFullScreen={this.state.dialogFullScreen}
                />
                <h3>Locks</h3>
                <PageLink
                    linkURL={"build-game"}
                    linkText={"Back"}
                />
                <button onClick={this.addLine}>Add New Lock</button>
                <div>
                    <table className="escapeRoomPageTable">
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Description</td>
                                <td>Combo</td>
                                <td>Lock Type</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.locks.map(function (lock, idx) {
                                    console.log("LOCK TYPES", lockTypes);
                                    console.log("MY LOCK", lock);
                                    var lockTypeName;
                                    for (var i in lockTypes) {
                                        if (lockTypes[i].id_lock_types == lock.lock_type) {
                                            lockTypeName = lockTypes[i].name;
                                            break;
                                        }
                                    }
                                    console.log("MY LOCK TYPE NAME", lockTypeName);
                                    return (
                                        <tr key={lock.id_locks}>
                                            <td>{lock.name}</td>
                                            <td>{lock.description}</td>
                                            <td>{lock.combo}</td>
                                            <td>{lockTypeName}</td>
                                            <td><button onClick={() => {
                                                editLineFunction({
                                                    lineId: lock.id_locks,
                                                    name: lock.name,
                                                    description: lock.description,
                                                    additionalInputs: {
                                                        combo: lock.combo
                                                    },
                                                    additionalSelections: {
                                                        lockType: {
                                                            value: lock.lock_type,
                                                            id: 'id_lock_types',
                                                            selectionList: lockTypes,
                                                            title: "Lock Type"
                                                        }
                                                    }
                                                }) 
                                            }}>EDIT</button></td>
                                            <td><button onClick={() => {
                                                removeLineFunction({
                                                    name: lock.name,
                                                    lineId: lock.id_locks
                                                })
                                            }}>REMOVE</button></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
