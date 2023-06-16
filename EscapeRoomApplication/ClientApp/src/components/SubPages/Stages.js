﻿import React, { Component } from 'react';
import { DataEntry } from '../SubComponents/BuildGame/DataEntry';
import { DialogMessage } from '../Widgets/DialogMessage';
import { Loader } from '../Widgets/Loader';

export class Stages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            stages: [],
            showDialog: false,
            dialogTitle: "",
            dialogContent: "",
            actionDialog: false,
            isErrorMessage: false,
            editData: {},
            editing: true,
            loading: false,
        }
        this.startLoading = this.startLoading.bind(this);
        this.stopLoading = this.stopLoading.bind(this);
        this.getStages = this.getStages.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.updateEditData = this.updateEditData.bind(this);
        this.addLine = this.addLine.bind(this);
        this.editLine = this.editLine.bind(this);
        this.editLineCallback = this.editLineCallback.bind(this);
        this.submitLineEntry = this.submitLineEntry.bind(this);
        this.submitLineEntryCallback = this.submitLineEntryCallback.bind(this);
        this.getStages();
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

    async getStages() {
        var gameInfo = await this.props.FrontEndDAO.getStages();
        console.log("GAME INFO", gameInfo);
        this.setState({
            stages: gameInfo.stages
        })
    }

    closeDialog(a,b) {
        this.setState({
            showDialog: false
        });

    }

    updateEditData(e,inputName) {
        console.log("E", e);
       var editData = this.state.editData;
        editData[inputName] = e.target.value;
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
            var updateResponse = await this.props.FrontEndDAO.updateStage(this.state.editData);
        }
        else {
            var updateResponse = await this.props.FrontEndDAO.addStage(this.state.editData);
        }
        if (updateResponse.success) {
            this.setState({
                stages: updateResponse.stages
            })
        }
        else {
            alert("THERE WAS AN ERROR")
        }
        this.setState({
            editData: {},
            showDialog: false,
            dialogTitle: "",
            dialogContent: "",
            actionDialog: false,
            isErrorMessage: false,
            editData: {},
            loading: false
        })
    }



    render() {
        console.log("STAGE STATE", this.state);
        var editLineFunction = this.editLine;
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
                <h3>Stages</h3>
                <button onClick={this.addLine}>Add New Stage</button>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Description</td>
                                <td>Edit</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.stages.map(function (stage, idx) {
                                    return (
                                        <tr key={stage.id_stages}>
                                            <td>{stage.name}</td>
                                            <td>{stage.description}</td>
                                            <td><button onClick={() => {
                                                editLineFunction({
                                                    lineId: stage.id_stages,
                                                    name: stage.name,
                                                    description: stage.description,
                                                    additionalInputs: {},
                                                    additionalSelections: {}
                                                })
                                            }}>EDIT</button></td>
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
