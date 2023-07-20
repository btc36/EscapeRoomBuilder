import React, { Component } from 'react';
import { DataEntry } from '../SubComponents/BuildGame/DataEntry';
import { DialogMessage } from '../Widgets/DialogMessage';
import { Loader } from '../Widgets/Loader';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { PageLink } from '../SubComponents/PageLink';
import { Items } from './Items';
import { Clues } from './Clues';

export class Puzzles extends Component {

    constructor(props) {
        super(props);
        this.state = {
            puzzles: [],
            items: [],
            puzzleItems: [],
            locks: [],
            stages: [],
            clues: [],
            showDialog: false,
            dialogTitle: "",
            dialogContent: "",
            actionDialog: false,
            isErrorMessage: false,
            defaultEditData: {
                name: "",
                description: "",
                additionalSelections: {
                    lock: {
                        value: -1,
                        selectionList: [],
                        id: "id_locks",
                        title: "Lock",
                        additional_values: ['combo'],
                    },
                    stage: {
                        value: -1,
                        selectionList: [],
                        id: "id_stages",
                        title: "Stage"
                    },
                    puzzleItem: {
                        value: "",
                        id: 'id_items',
                        selectionList: [],
                        multiSelect: true,
                        title: "Required Items"
                    }
                }
            },
            editData: {
                name: "",
                description: "",
                additionalSelections: {
                    lock: {
                        value: -1,
                        selectionList: [],
                        id: "id_locks",
                        title: "Lock",
                        additional_values: ['combo'],
                    },
                    stage: {
                        value: -1,
                        selectionList: [],
                        id: "id_stages",
                        title: "Stage"
                    },
                    puzzleItem: {
                        value: "",
                        id: 'id_items',
                        selectionList: [],
                        multiSelect: true,
                        title: "Required Items"
                    }
                }
            },
            editing: true,
            loading: true,
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
        this.createPuzzleItemsDict = this.createPuzzleItemsDict.bind(this);
        this.updateClueValue = this.updateClueValue.bind(this);
        this.addClue = this.addClue.bind(this);
        this.getClues = this.getClues.bind(this);
        this.updateClue = this.updateClue.bind(this);
        this.removeClue = this.removeClue.bind(this);
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
        editData.additionalSelections.puzzleItem.selectionList = gameInfo.items;
        this.setState({
            puzzles: gameInfo.puzzles,
            puzzleItems: gameInfo.puzzleItems,
            items: gameInfo.items,
            locks: gameInfo.locks,
            stages: gameInfo.stages,
            editData: editData
        })
        this.stopLoading();
    }


    closeDialog(a, b) {
        this.setState({
            showDialog: false,
            editData: this.state.defaultEditData
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
                dataEntryTitle="Add New Puzzle"
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
        var removelineResponse = await this.props.FrontEndDAO.removePuzzle(removeData.lineId);
        if (removelineResponse.success) {
            this.setState({
                puzzles: removelineResponse.puzzles
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
                dataEntryTitle="Edit Puzzle"
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
            var updateResponse = await this.props.FrontEndDAO.updatePuzzle(this.state.editData);
        }
        else {
            var updateResponse = await this.props.FrontEndDAO.addPuzzle(this.state.editData);
        }
        console.log("PUZZLE TYPES RESPONSE", updateResponse)
        if (updateResponse.success) {
            this.setState({
                puzzles: updateResponse.puzzles,
                puzzleItems: updateResponse.puzzleItems
            })
        }
        else {
            //The page needs to reload, its a timing issue. 
            //The database is updated, but something times out
            //If I step through with the debugger it works
            //Find the issue later, for now just refresh
            if (updateResponse.message.indexOf("disposed")) {
                window.location.reload(true);
            }
            else {
                alert("THERE WAS AN ERROR", updateResponse)
            }
        }
        this.setState({
            editData: {
                name: "",
                description: "",
                additionalSelections: {
                    lock: {
                        value: -1,
                        id: "id_locks",
                        selectionList: this.state.locks,
                        additional_values: ['combo'],
                        title: 'Lock'
                    },
                    stage: {
                        value: -1,
                        id: "id_stages",
                        selectionList: this.state.stages,
                        title: "Stage"
                    },
                    puzzleItem: {
                        value: "",
                        id: 'id_items',
                        selectionList: this.state.items,
                        multiSelect: true,
                        title: "Required Items"
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

    createPuzzleItemsDict() {
        var puzzleItems = this.state.puzzleItems;
        var puzzleItemDict = {};
        for (var i in puzzleItems) {
            var puzzleItem = puzzleItems[i];
            var puzzleId = puzzleItem.puzzle;
            if (!puzzleItemDict[puzzleId]) {
                puzzleItemDict[puzzleId] = {
                    items: [],
                    itemsString: "",
                    itemIdString: ""
                };
            }
            puzzleItemDict[puzzleId].items.push(puzzleItem);
            var itemName = puzzleItem.item_name;
            var itemStringArray = puzzleItemDict[puzzleId].itemsString ? puzzleItemDict[puzzleId].itemsString.split(", ") : [];
            itemStringArray.push(itemName);
            if (itemStringArray.length > 1) {
                puzzleItemDict[puzzleId].itemsString = itemStringArray.join(", ");
            }
            else {
                puzzleItemDict[puzzleId].itemsString = itemName;
            }
            var itemId = puzzleItem.item.toString();
            var itemIdStringArray = puzzleItemDict[puzzleId].itemIdString ? puzzleItemDict[puzzleId].itemIdString.split() : [];
            itemIdStringArray.push(itemId);
            if (itemIdStringArray.length > 1) {
                puzzleItemDict[puzzleId].itemIdString = itemIdStringArray.join();
            }
            else {
                puzzleItemDict[puzzleId].itemIdString = itemId;
            }
        }
        return puzzleItemDict;
    }

    async getClues(puzzleId, puzzleName) {  
        var gameInfo = await this.props.FrontEndDAO.getClues(puzzleId);
        this.setState({
            clues: gameInfo.clues,
            dialogContent: ""
        });
        console.log("GAME INFO**************************,", gameInfo.clues)
        setTimeout(() => { this.setClueDialog(gameInfo.clues, puzzleId, puzzleName) });
    }

    setClueDialog(clues, puzzleId, puzzleName) {
        this.setState({
            showDialog: true,
            dialogTitle: "Clues for " + puzzleName,
            dialogContent: <Clues
                clues={clues}
                updateClueValue={this.updateClueValue}
                updateClue={this.updateClue}
                removeClue={this.removeClue}
                addClue={this.addClue}
                puzzleId={puzzleId}
                puzzleName={puzzleName}
            />,
            dialogFullScreen: true
        });
    }

    updateClueValue(e, clueId) {
        console.log("UPDATING", e, clueId)
        console.log("CLUES", this.state.clues)
        console.log("STATE",this.state);
        var clues = this.state.clues;
        for (var i in clues) {
            if (clues[i].id_clues == clueId) {
                clues[i].clue_text = e.target.value
                break;
            }
        }
        this.setState({
            clues: clues
        })
    }

    async addClue(puzzleId, puzzleName) {
        var newClueText = document.getElementById("newClue").value;
        if (newClueText) {
            var gameInfo = await this.props.FrontEndDAO.addClue({
                puzzleId: puzzleId,
                content: newClueText
            });
            console.log("GAME INFO 2,", gameInfo.clues)
            if (gameInfo.success) {
                document.getElementById("newClue").value = ""
                this.getClues(puzzleId, puzzleName);
            }
            else {
                console.log("GAME INFO", gameInfo)
                alert("THERE HAS BEEN AN ERROR");
            }
        }
    }

    async updateClue(clueId, puzzleId, puzzleName) {
        var clues = this.state.clues;
        var clueText;
        for (var i in clues) {
            if (clues[i].id_clues == clueId) {
                clueText = clues[i].clue_text;
                break;
            }
        }
        if (clueText) {
            var gameInfo = await this.props.FrontEndDAO.updateClue({
                content: clueText,
                clueId: clueId,
                puzzleId: puzzleId
            });
            console.log("GAME INFO 3,", gameInfo.clues)
            if (gameInfo.success) {
                this.getClues(puzzleId, puzzleName);
            }
            else {
                console.log("GAME INFO", gameInfo)
                alert("THERE HAS BEEN AN ERROR");
            }
        }
        else {
            alert("The clue cannot be empty");
        }
        console.log("UPDATE CLUE", clueId)
    }

    async removeClue(clueId, puzzleId, puzzleName) {
        var gameInfo = await this.props.FrontEndDAO.removeClue(clueId, puzzleId);
        console.log("GAME INFO 4,", gameInfo.clues)
        if (gameInfo.success) {
            this.getClues(puzzleId, puzzleName);
        }
        else {
            console.log("GAME INFO", gameInfo)
            alert("THERE HAS BEEN AN ERROR");
        }
    }

    render() {
        console.log("Puzzles STATE", this.state);
        var editLineFunction = this.editLine;
        var removeLineFunction = this.removeLineConfirm;
        var getCluesFunction = this.getClues;
        var puzzleItemDict = this.createPuzzleItemsDict();
        var locks = this.state.locks;
        var stages = this.state.stages;
        var items = this.state.items;
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
                <h3 className="pageTitle">Puzzles</h3>
                <PageLink
                    linkURL={"build-game"}
                    linkText={"Back"}
                />
                <button className="addNewButton" onClick={this.addLine}>Add New Puzzle</button>
                <div>
                    <table className="escapeRoomPageTable">
                        <thead>
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>Name</td>
                                <td>Description</td>
                                <td>Lock</td>
                                <td>Stage</td>
                                <td>Items</td>
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
                                            <td><button onClick={() => { getCluesFunction(puzzle.id_puzzles, puzzle.name) }}>Clues</button></td>
                                            <td><button onClick={() => {
                                                editLineFunction({
                                                    lineId: puzzle.id_puzzles,
                                                    name: puzzle.name,
                                                    description: puzzle.description,
                                                    additionalSelections: {
                                                        lock: {
                                                            value: puzzle.lock_solved,
                                                            id: 'id_locks',
                                                            selectionList: locks,
                                                            additional_values: ['combo'],
                                                            title: "Lock"
                                                        },
                                                        stage: {
                                                            value: puzzle.stage,
                                                            id: 'id_stages',
                                                            selectionList: stages,
                                                            title: "Stage"
                                                        },
                                                        puzzleItem: {
                                                            value: puzzleItemDict[puzzle.id_puzzles] ? puzzleItemDict[puzzle.id_puzzles].itemIdString : -1,
                                                            id: 'id_items',
                                                            selectionList: items,
                                                            multiSelect: true,
                                                            title: "Required Items"
                                                        }
                                                    },
                                                })
                                            }}>EDIT</button></td>
                                            <td><button onClick={() => {
                                                removeLineFunction({
                                                    name: puzzle.name,
                                                    lineId: puzzle.id_puzzles
                                                })
                                            }}>REMOVE</button></td>
                                            <td>{puzzle.name}</td>
                                            <td>{puzzle.description}</td>
                                            <td>{lockName}</td>
                                            <td>{stageName}</td>
                                            <td>{puzzleItemDict[puzzle.id_puzzles] ? puzzleItemDict[puzzle.id_puzzles].itemsString : "N/A"}</td>
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
