import React, { Component } from 'react';
import { DataEntry } from '../SubComponents/BuildGame/DataEntry';
import { DialogMessage } from '../Widgets/DialogMessage';
import { Loader } from '../Widgets/Loader';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { PageLink } from '../SubComponents/PageLink';

export class PropNLocations extends Component {

    constructor(props) {
        super(props);
        this.state = {
            propNLocations: [],
            puzzles: [],
            showDialog: false,
            dialogTitle: "",
            dialogContent: "",
            actionDialog: false,
            isErrorMessage: false,
            editData: {
                name: "",
                description: "",
                additionalSelections: {
                    puzzle: {
                        value: -1,
                        selectionList: [],
                        id: "id_puzzles",
                        title: "Puzzle"
                    },
                    parent: {
                        value: -1,
                        selectionList: [],
                        id: "id_props",
                        title: "Location"
                    }
                }
            },
            editing: true,
            loading: true,
        }
        this.startLoading = this.startLoading.bind(this);
        this.stopLoading = this.stopLoading.bind(this);
        this.showConfirm = this.showConfirm.bind(this);
        this.getPropNLocations = this.getPropNLocations.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.updateEditData = this.updateEditData.bind(this);
        this.addLine = this.addLine.bind(this);
        this.removeLineConfirm = this.removeLineConfirm.bind(this);
        this.removeLine = this.removeLine.bind(this);
        this.editLine = this.editLine.bind(this);
        this.editLineCallback = this.editLineCallback.bind(this);
        this.submitLineEntry = this.submitLineEntry.bind(this);
        this.submitLineEntryCallback = this.submitLineEntryCallback.bind(this);
        this.getPropNLocations();
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

    async getPropNLocations() {
        var gameInfo = await this.props.FrontEndDAO.getPropNLocations();
        var editData = this.state.editData;
        editData.additionalSelections.puzzle.selectionList = gameInfo.puzzles;
        editData.additionalSelections.parent.selectionList = gameInfo.propNLocations;
        this.setState({
            propNLocations: gameInfo.propNLocations,
            puzzles: gameInfo.puzzles,
            editData: editData
        })
        this.stopLoading();
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
                dataEntryTitle="Add New Prop"
            />
        })
    }

    removeLineConfirm(removeData) {
        this.showConfirm(
            "Remove Prop/Location",
            "Are you sure you want to remove " + removeData.name + "? This cannot be reversed",
            "Remove Prop/Location",
            "Just Kidding",
            () => { this.removeLine(removeData) },
            () => { }
        );
    }

    async removeLine(removeData) {
        var removelineResponse = await this.props.FrontEndDAO.removePropNLocation(removeData.lineId);
        if (removelineResponse.success) {
            this.setState({
                propNLocations: removelineResponse.propNLocations
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
                dataEntryTitle="Edit Prop"
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
            var updateResponse = await this.props.FrontEndDAO.updatePropNLocation(this.state.editData);
        }
        else {
            var updateResponse = await this.props.FrontEndDAO.addPropNLocation(this.state.editData);
        }
        console.log("PropNLocation RESPONSE", updateResponse)
        if (updateResponse.success) {
            this.setState({
                propNLocations: updateResponse.propNLocations
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
                    puzzle: {
                        value: -1,
                        id: "id_puzzles",
                        selectionList: this.state.puzzles,
                        title: "Puzzle"
                    },
                    parent: {
                        value: -1,
                        id: "id_props",
                        selectionList: this.state.propNLocations,
                        title: "Location"
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
        console.log("PropNLocation STATE", this.state);
        var editLineFunction = this.editLine;
        var removeLineFunction = this.removeLineConfirm;
        var puzzles = this.state.puzzles;
        var propNLocations = this.state.propNLocations;
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
                <h3>Props/Locations</h3>
                <PageLink
                    linkURL={"build-game"}
                    linkText={"Back"}
                />
                <button onClick={this.addLine}>Add New Prop/Location</button>
                <div>
                    <table className="escapeRoomPageTable">
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Description</td>
                                <td>Parent</td>
                                <td>Access Puzzle</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.propNLocations.map(function (propNLocation, idx) {
                                    console.log("Puzzles", puzzles);
                                    console.log("PropsNLocations", propNLocations);
                                    var puzzleName;
                                    var parentName;
                                    for (var i in puzzles) {
                                        if (puzzles[i].id_puzzles == propNLocation.access_puzzle) {
                                            puzzleName = puzzles[i].name;
                                            break;
                                        }
                                    }
                                    for (var i in propNLocations) {
                                        if (propNLocations[i].id_props == propNLocation.parent_prop) {
                                            parentName = propNLocations[i].name;
                                            break;
                                        }
                                    }
                                    console.log("MY Puzzle NAME", puzzleName);
                                    console.log("MY parent NAME", parentName);
                                    return (
                                        <tr key={propNLocation.id_props}>
                                            <td>{propNLocation.name}</td>
                                            <td>{propNLocation.description}</td>
                                            <td>{parentName}</td>
                                            <td>{puzzleName}</td>
                                            <td><button onClick={() => {
                                                editLineFunction({
                                                    lineId: propNLocation.id_props,
                                                    name: propNLocation.name,
                                                    description: propNLocation.description,
                                                    additionalSelections: {
                                                        puzzle: {
                                                            value: propNLocation.access_puzzle,
                                                            id: 'id_puzzles',
                                                            selectionList: puzzles,
                                                            title: "Puzzle"
                                                        },
                                                        parent: {
                                                            value: propNLocation.parent_prop,
                                                            id: 'id_props',
                                                            selectionList: propNLocations,
                                                            title: "Location"
                                                        }
                                                    }
                                                })
                                            }}>EDIT</button></td>
                                            <td><button onClick={() => {
                                                removeLineFunction({
                                                    name: propNLocation.name,
                                                    lineId: propNLocation.id_props
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
