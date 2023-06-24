import React, { Component } from 'react';
import { DataEntry } from '../SubComponents/BuildGame/DataEntry';
import { DialogMessage } from '../Widgets/DialogMessage';
import { Loader } from '../Widgets/Loader';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { PageLink } from '../SubComponents/PageLink';

export class Puzzles extends Component {

    constructor(props) {
        super(props);
        this.state = {
            puzzles: [],
            locks: [],
            stages: [],
            showDialog: false,
            dialogTitle: "",
            dialogContent: "",
            actionDialog: false,
            isErrorMessage: false,
            editData: {
                name: "",
                description: "",
                additionalSelections: {
                    lock: {
                        value: "",
                        selectionList: [],
                        id: "id_locks"
                    },
                    stage: {
                        value: "",
                        selectionList: [],
                        id: "id_stages"
                    }
                }
            },
            editing: true,
            loading: false,
        }
        this.startLoading = this.startLoading.bind(this);
        this.stopLoading = this.stopLoading.bind(this);
        this.showConfirm = this.showConfirm.bind(this);
        this.getPuzzles = this.getPuzzles.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.updateEditData = this.updateEditData.bind(this);
        this.addLine = this.addLine.bind(this);
        this.removeLineConfirm = this.removeLineConfirm.bind(this);
        this.removeLine = this.removeLine.bind(this);
        this.editLine = this.editLine.bind(this);
        this.editLineCallback = this.editLineCallback.bind(this);
        this.submitLineEntry = this.submitLineEntry.bind(this);
        this.submitLineEntryCallback = this.submitLineEntryCallback.bind(this);
        this.getPuzzles();
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

    async getPuzzles() {
        var gameInfo = await this.props.FrontEndDAO.getPuzzles();
        var editData = this.state.editData;
        editData.additionalSelections.lock.selectionList = gameInfo.locks;
        editData.additionalSelections.stage.selectionList = gameInfo.stages;
        this.setState({
            puzzles: gameInfo.puzzles,
            locks: gameInfo.locks,
            stages: gameInfo.stages,
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
            "Remove Puzzle",
            "Are you sure you want to remove " + removeData.name + "? This cannot be reversed",
            "Remove Puzzle",
            "Just Kidding",
            () => { this.removeLine(removeData) },
            () => { }
        );
    }

    async removeLine(removeData) {
        var removelineReponse = await this.props.FrontEndDAO.removePuzzle(removeData.lineId);
        if (removelineReponse.success) {
            this.setState({
                puzzles: removelineReponse.puzzles
            })
        }
        else {
            alert("THERE HAS BEEN AN ERROR", removelineReponse);
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
        if (!editData.name || !editData.description || !editData.additionalSelections.stage.value || !editData.additionalSelections.lock.value) {
            alert('You cannot have empty values');
            return;
        }
        this.startLoading();
        setTimeout(this.submitLineEntryCallback)
    }

    async submitLineEntryCallback() {
        if (this.state.editing) {
            var updateResponse = await this.props.FrontEndDAO.updatePuzzle(this.state.editData);
        }
        else {
            var updateResponse = await this.props.FrontEndDAO.addPuzzle(this.state.editData);
        }
        console.log("PUZZLE TYPES RESPONSE", updateResponse)
        if (updateResponse.success) {
            this.setState({
                puzzles: updateResponse.puzzles
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
                    lock: {
                        value: "",
                        id: "id_locks",
                        selectionList: this.state.locks
                    },
                    stage: {
                        value: "",
                        id: "id_stages",
                        selectionList: this.state.stages
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
        console.log("Puzzles STATE", this.state);
        var editLineFunction = this.editLine;
        var removeLineFunction = this.removeLineConfirm;
        var locks = this.state.locks;
        var stages = this.state.stages;
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
                <h3>Puzzles</h3>
                <button> <PageLink
                    linkURL={"build-game"}
                    linkText={"Back"}
                /></button>
                <button onClick={this.addLine}>Add New Puzzle</button>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Description</td>
                                <td>Lock</td>
                                <td>Stage</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.puzzles.map(function (puzzle, idx) {
                                    console.log("Stages", stages);
                                    console.log("Locks", locks);
                                    console.log("MY Puzzle", puzzle);
                                    var stageName;
                                    var lockName;
                                    for (var i in locks) {
                                        if (locks[i].id_locks == puzzle.lock_solved) {
                                            lockName = locks[i].name;
                                            break;
                                        }
                                    }
                                    for (var i in stages) {
                                        if (stages[i].id_stages == puzzle.stage) {
                                            stageName = stages[i].name;
                                            break;
                                        }
                                    }
                                    console.log("MY LOCK NAME", lockName);
                                    console.log("MY STAGE NAME", stageName);
                                    return (
                                        <tr key={puzzle.id_puzzles}>
                                            <td>{puzzle.name}</td>
                                            <td>{puzzle.description}</td>
                                            <td>{lockName}</td>
                                            <td>{stageName}</td>
                                            <td><button onClick={() => {
                                                editLineFunction({
                                                    lineId: puzzle.id_puzzles,
                                                    name: puzzle.name,
                                                    description: puzzle.description,
                                                    additionalSelections: {
                                                        lock: {
                                                            value: puzzle.lock_solved,
                                                            id: 'id_locks',
                                                            selectionList: locks
                                                        },
                                                        stage: {
                                                            value: puzzle.stage,
                                                            id: 'id_stages',
                                                            selectionList: stages
                                                        }
                                                    }
                                                })
                                            }}>EDIT</button></td>
                                            <td><button onClick={() => {
                                                removeLineFunction({
                                                    name: puzzle.name,
                                                    lineId: puzzle.id_puzzles
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
