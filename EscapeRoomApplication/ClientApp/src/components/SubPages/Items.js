import React, { Component } from 'react';
import { DataEntry } from '../SubComponents/BuildGame/DataEntry';
import { DialogMessage } from '../Widgets/DialogMessage';
import { Loader } from '../Widgets/Loader';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { PageLink } from '../SubComponents/PageLink';

export class Items extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            locations: [],
            showDialog: false,
            dialogTitle: "",
            dialogContent: "",
            actionDialog: false,
            isErrorMessage: false,
            editData: {
                name: "",
                description: "",
                additionalSelections: {
                    location: {
                        value: -1,
                        selectionList: [],
                        id: "id_props"
                    }
                }
            },
            editing: true,
            loading: false,
        }
        this.startLoading = this.startLoading.bind(this);
        this.stopLoading = this.stopLoading.bind(this);
        this.showConfirm = this.showConfirm.bind(this);
        this.getItems = this.getItems.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.updateEditData = this.updateEditData.bind(this);
        this.addLine = this.addLine.bind(this);
        this.removeLineConfirm = this.removeLineConfirm.bind(this);
        this.removeLine = this.removeLine.bind(this);
        this.editLine = this.editLine.bind(this);
        this.editLineCallback = this.editLineCallback.bind(this);
        this.submitLineEntry = this.submitLineEntry.bind(this);
        this.submitLineEntryCallback = this.submitLineEntryCallback.bind(this);
        this.getItems();
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

    async getItems() {
        var gameInfo = await this.props.FrontEndDAO.getItems();
        var editData = this.state.editData;
        editData.additionalSelections.location.selectionList = gameInfo.propNLocations;
        this.setState({
            items: gameInfo.items,
            locations: gameInfo.propNLocations,
            editData: editData
        })
    }

    closeDialog(a, b) {
        this.setState({
            showDialog: false
        });
    }

    updateEditData(e, inputName, inputType) {
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
            "Remove Item",
            "Are you sure you want to remove " + removeData.name + "? This cannot be reversed",
            "Remove Item",
            "Just Kidding",
            () => { this.removeLine(removeData) },
            () => { }
        );
    }

    async removeLine(removeData) {
        var removelineResponse = await this.props.FrontEndDAO.removeItem(removeData.lineId);
        if (removelineResponse.success) {
            this.setState({
                items: removelineResponse.items
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
        if (!editData.name || !editData.description) {
            alert('You cannot have empty values');
            return;
        }
        this.startLoading();
        setTimeout(this.submitLineEntryCallback)
    }

    async submitLineEntryCallback() {
        if (this.state.editing) {
            var updateResponse = await this.props.FrontEndDAO.updateItem(this.state.editData);
        }
        else {
            var updateResponse = await this.props.FrontEndDAO.addItem(this.state.editData);
        }
        console.log("Item RESPONSE", updateResponse)
        if (updateResponse.success) {
            this.setState({
                items: updateResponse.items
            })
        }
        else {
            alert("THERE WAS AN ERROR", updateResponse)
        }
        this.setState({
            editData: {
                name: "",
                description: "",
                additionalSelections: {
                    location: {
                        value: -1,
                        id: "id_props",
                        selectionList: this.state.propNLocations
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
        console.log("Item STATE", this.state);
        var editLineFunction = this.editLine;
        var removeLineFunction = this.removeLineConfirm;
        var locations = this.state.locations;
        return (
            <div>
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
                <h3>Items</h3>
                <button> <PageLink
                    linkURL={"build-game"}
                    linkText={"Back"}
                /></button>
                <button onClick={this.addLine}>Add New Item</button>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Description</td>
                                <td>Location</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.items.map(function (item, idx) {
                                    var locationName;
                                    for (var i in locations) {
                                        if (locations[i].id_props == item.location) {
                                            locationName = locations[i].name;
                                            break;
                                        }
                                    }
                                    return (
                                        <tr key={item.id_props}>
                                            <td>{item.name}</td>
                                            <td>{item.description}</td>
                                            <td>{locationName}</td>
                                            <td><button onClick={() => {
                                                editLineFunction({
                                                    lineId: item.id_items,
                                                    name: item.name,
                                                    description: item.description,
                                                    additionalSelections: {
                                                        location: {
                                                            value: item.location,
                                                            id: 'id_props',
                                                            selectionList: locations
                                                        }
                                                    }
                                                })
                                            }}>EDIT</button></td>
                                            <td><button onClick={() => {
                                                removeLineFunction({
                                                    name: item.name,
                                                    lineId: item.id_items
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
