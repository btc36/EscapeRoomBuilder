import React, { Component } from 'react';
import Select from 'react-select'

export class DataEntry extends Component {

    constructor(props) {
        super(props)
        console.log("DATA ENTRY PROPS", props);
        this.translateDataToSelect = this.translateDataToSelect.bind(this);
        this.translateDataFromSelect = this.translateDataFromSelect.bind(this);
        this.getOptionName = this.getOptionName.bind(this);
        this.getDefaultValue = this.getDefaultValue.bind(this);
    }

    translateDataToSelect(selectionList, selectId, defaultValues, additionalValues) {
        console.log("selectionList", selectionList);
        console.log("DEFAULT VALUE", defaultValues);
        var translatedData = [];
        var selectedValues = [];
        if (defaultValues.length) {
            for (var i in defaultValues) {
                selectedValues.push(parseInt(defaultValues[i].value));
            }
        }
        else {
            selectedValues.push(parseInt(defaultValues.value));
        }
        for (var i in selectionList) {
            var value = selectionList[i][selectId];
            if (selectedValues.indexOf(value) > -1) {
                //Dont give selected options as an option
                continue;
            }
            var label = selectionList[i].name;
            if (additionalValues) {
                for (var j in additionalValues) {
                    label += (" - " + selectionList[i][additionalValues[j]]);
                }
            }
            translatedData.push({
                label: label,
                value: value
            })
        }
        return translatedData;
    }

    translateDataFromSelect(e,inputName) {
        var inputType = "selection";
        var value = e.value;
        if (e.length) {
            var values = []
            for (var i in e) {
                values.push(e[i].value);
            }
            value = values.join();
        }
        var selectEvent = {
            target: {
                value: value
            }
        }
        this.props.updateEditData(selectEvent, inputName, inputType)
    }

    getOptionName(selectionList, value, selectId) {
        console.log('GET OPTION NAME', selectionList, value, selectId);
        var name = "N/A";
        for (var i in selectionList) {
            if (selectionList[i][selectId] == value) {
                name = selectionList[i].name;
                break;
            }
        }
        return name;
    }

    getDefaultValue(selectInfo) {
        console.log("SELECT INFO", selectInfo);
        var valueArray = selectInfo.value ? selectInfo.value.toString().split(",") : [];
        if (valueArray.length == 1) {
            var label = "Select Option";
            if (parseInt(selectInfo.value) > -1) {
                return {
                    value: selectInfo.value,
                    label: this.getOptionName(selectInfo.selectionList, selectInfo.value, selectInfo.id)
                }
            }
            else {
                return []
            }
            
        }
        else {
            var defaultValuesArray = [];
            for (var i in valueArray) {
                var label = this.getOptionName(selectInfo.selectionList, valueArray[i], selectInfo.id)
                defaultValuesArray.push({
                    value: valueArray[i],
                    label: label
                })
            }
            return defaultValuesArray;
        }
    }

    render() {
        console.log("EDIT DATA", this.props.editData);
        var editData = this.props.editData;
        var updateEditDataFunction = this.props.updateEditData;
        var translateDataToSelectFunction = this.translateDataToSelect;
        var translateFromSelectFunction = this.translateDataFromSelect;
        var getDefaultValueFunction = this.getDefaultValue;
        var extraInputs = editData.additionalInputs ? Object.keys(editData.additionalInputs) : [];
        var selectOptions = editData.additionalSelections ? Object.keys(editData.additionalSelections) : [];
        return (
            <div className="dataEntry">
                <h1>{this.props.dataEntryTitle}</h1>
                <label>
                    <b>Name</b>
                    <input className="nameInput" value={this.props.editData.name} onChange={(e) => { this.props.updateEditData(e, 'name') }} type="text" />
                </label>
                <label>
                    <b>Description</b>
                    <textarea className="descriptionInput" value={this.props.editData.description} onChange={(e) => { this.props.updateEditData(e, 'description') }} type="text" rows="5" cols="60" name="description"></textarea>
                </label>
                {
                    extraInputs.map(function (extraInput, idx) {
                        var inputCapitalized =
                            extraInput.charAt(0).toUpperCase()
                            + extraInput.slice(1)
                        return (
                            <div>
                                <b>{inputCapitalized}</b>
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
                        var selectOptionTitle = editData.additionalSelections[selectOption].title
                        var defaultValue = getDefaultValueFunction(editData.additionalSelections[selectOption]);
                        return (
                                <div className="selectOption">
                                    <b>{selectOptionTitle}</b>
                                    <Select
                                    options={translateDataToSelectFunction(selectionList, selectId, defaultValue, editData.additionalSelections[selectOption].additional_values )}
                                        touchUi={false}
                                        onChange={(e, instance) => { translateFromSelectFunction(e, selectOption)}}
                                        defaultValue={defaultValue}
                                        isMulti={editData.additionalSelections[selectOption].multiSelect}
                                    />  
                                </div>
                        )
                    })
                }
                <button onClick={this.props.submitLineEntry}>Submit</button>
            </div>
        );
    }
}
