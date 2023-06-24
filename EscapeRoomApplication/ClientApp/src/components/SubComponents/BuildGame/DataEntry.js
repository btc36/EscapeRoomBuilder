import React, { Component } from 'react';

export class DataEntry extends Component {

    constructor(props) {
        super(props)
        console.log("DATA ENTRY PROPS", props);
    }

    render() {
        console.log("EDIT DATA", this.props.editData);
        var editData = this.props.editData;
        var updateEditDataFunction = this.props.updateEditData;
        var extraInputs = editData.additionalInputs ? Object.keys(editData.additionalInputs) : [];
        var selectOptions = editData.additionalSelections ? Object.keys(editData.additionalSelections) : [];
        return (
            <div className="dataEntry">
                <label>
                    <p>Name</p>
                    <input className="nameInput" value={this.props.editData.name} onChange={(e) => { this.props.updateEditData(e, 'name') }} type="text" />
                </label>
                <label>
                    <p>Description</p>
                    <textarea className="descriptionInput" value={this.props.editData.description} onChange={(e) => { this.props.updateEditData(e, 'description') }} type="text" rows="5" cols="60" name="description"></textarea>
                </label>
                {
                    extraInputs.map(function (extraInput, idx) {
                        return (
                            <div>
                                <p>{extraInput}</p>
                                <textarea className="additionalInput" value={editData.additionalInputs[extraInput]} onChange={(e) => { updateEditDataFunction(e, extraInput, "extraInput") }} type="text" rows="5" cols="60" name={extraInput}></textarea>
                            </div>
                        )
                    })
                }
                {
                    selectOptions.map(function (selectOption, idx) {
                        console.log("SELECT OPTION", editData.additionalSelections[selectOption])
                        var selectionList = editData.additionalSelections[selectOption].selectionList;
                        var selectId = editData.additionalSelections[selectOption].id;
                        return (
                            <div>
                                <p>{selectOption}</p>
                                <select className="additionalSelect" value={editData.additionalSelections[selectOption].value} onChange={(e) => { updateEditDataFunction(e, selectOption,"selection") }}>
                                    <option key={-1} defaultValue>-Select {selectOption}-</option>
                                    {
                                        selectionList.map(function (selectOptionValue, idx) {
                                            console.log("selectOptionValue[selectId]", selectOptionValue[selectId])
                                            console.log("SELECTED", selectOptionValue[selectId] == editData.additionalSelections[selectOption].value)
                                            return (<option key={idx} value={selectOptionValue[selectId]}>{selectOptionValue.name}</option>)
                                        })
                                   }
                                </select>
                            </div>
                        )
                    })
                }
                <button onClick={this.props.submitLineEntry}>Submit</button>
            </div>
        );
    }
}
