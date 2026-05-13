import React, { Component } from 'react';
import Select from 'react-select'

export class DataEntry extends Component {

    constructor(props) {
        super(props)
        this.state = {
            quickAddActive: null,
            quickAddName: '',
            quickAddDesc: '',
            quickAddExtra: {}
        };
        this.translateDataToSelect = this.translateDataToSelect.bind(this);
        this.translateDataFromSelect = this.translateDataFromSelect.bind(this);
        this.getOptionName = this.getOptionName.bind(this);
        this.getDefaultValue = this.getDefaultValue.bind(this);
        this.openQuickAdd = this.openQuickAdd.bind(this);
        this.submitQuickAdd = this.submitQuickAdd.bind(this);
    }

    translateDataToSelect(selectionList, selectId, defaultValues, additionalValues, multiSelect) {
        var translatedData = [];
        var selectedValues = [];
        if (defaultValues.length) {
            for (var i in defaultValues) {
                selectedValues.push(parseInt(defaultValues[i].value));
            }
        } else {
            selectedValues.push(parseInt(defaultValues.value));
        }
        for (var i in selectionList) {
            var value = selectionList[i][selectId];
            if (selectedValues.indexOf(value) > -1) continue;
            var label = selectionList[i].name;
            if (additionalValues) {
                for (var j in additionalValues) {
                    label += (" - " + selectionList[i][additionalValues[j]]);
                }
            }
            translatedData.push({ label, value });
        }
        return translatedData;
    }

    translateDataFromSelect(e, inputName) {
        var inputType = "selection";
        var value = e.value;
        if (e.length) {
            var values = [];
            for (var i in e) values.push(e[i].value);
            value = values.join();
        }
        this.props.updateEditData({ target: { value } }, inputName, inputType);
    }

    getOptionName(selectionList, value, selectId) {
        var name = "N/A";
        for (var i in selectionList) {
            if (selectionList[i][selectId] == value) {
                name = selectionList[i].name;
                if (selectionList[i].combo != null) name += "-" + selectionList[i].combo;
                break;
            }
        }
        return name;
    }

    getDefaultValue(selectInfo) {
        var valueArray = selectInfo.value ? selectInfo.value.toString().split(",") : [];
        if (valueArray.length === 1) {
            if (parseInt(selectInfo.value) > -1) {
                return {
                    value: selectInfo.value,
                    label: this.getOptionName(selectInfo.selectionList, selectInfo.value, selectInfo.id)
                };
            } else {
                return [];
            }
        } else {
            return valueArray.map(v => ({
                value: v,
                label: this.getOptionName(selectInfo.selectionList, v, selectInfo.id)
            }));
        }
    }

    openQuickAdd(key) {
        this.setState({ quickAddActive: key, quickAddName: '', quickAddDesc: '', quickAddExtra: {} });
    }

    submitQuickAdd(key) {
        const { quickAddName, quickAddDesc, quickAddExtra } = this.state;
        if (!quickAddName || !quickAddDesc) {
            alert('Name and description are required');
            return;
        }
        this.setState({ quickAddActive: null, quickAddName: '', quickAddDesc: '', quickAddExtra: {} });
        if (this.props.onQuickAdd) {
            this.props.onQuickAdd(key, { name: quickAddName, description: quickAddDesc, ...quickAddExtra });
        }
    }

    render() {
        var editData = this.props.editData;
        var quickAddConfig = this.props.quickAddConfig || {};
        var extraInputs = editData.additionalInputs ? Object.keys(editData.additionalInputs) : [];
        var selectOptions = editData.additionalSelections ? Object.keys(editData.additionalSelections) : [];
        return (
            <div className="dataEntry">
                <h1>{this.props.dataEntryTitle}</h1>
                <label>
                    <b>Name</b>
                    <input className="nameInput" value={editData.name} onChange={e => this.props.updateEditData(e, 'name')} type="text" />
                </label>
                <label>
                    <b>Description</b>
                    <textarea className="descriptionInput" defaultValue={editData.description} onChange={e => this.props.updateEditData(e, 'description')} rows="5" cols="60" name="description" />
                </label>
                {extraInputs.map(extraInput => (
                    <div key={extraInput}>
                        <b>{extraInput.charAt(0).toUpperCase() + extraInput.slice(1)}</b>
                        <textarea
                            className="additionalInput"
                            value={editData.additionalInputs[extraInput]}
                            onChange={e => this.props.updateEditData(e, extraInput, "extraInput")}
                            rows="5" cols="60" name={extraInput}
                        />
                    </div>
                ))}
                {selectOptions.map(selectOption => {
                    var selectionInfo = editData.additionalSelections[selectOption];
                    var defaultValue = this.getDefaultValue(selectionInfo);
                    var qaConfig = quickAddConfig[selectOption];
                    var isQAActive = this.state.quickAddActive === selectOption;
                    return (
                        <div className="selectOption" key={selectOption}>
                            <b>{selectionInfo.title}</b>
                            <Select
                                options={this.translateDataToSelect(
                                    selectionInfo.selectionList,
                                    selectionInfo.id,
                                    defaultValue,
                                    selectionInfo.additional_values,
                                    selectionInfo.multiSelect
                                )}
                                touchUi={false}
                                onChange={e => this.translateDataFromSelect(e, selectOption)}
                                value={defaultValue}
                                isMulti={selectionInfo.multiSelect}
                            />
                            {qaConfig && (
                                isQAActive ? (
                                    <div className="quick-add-form">
                                        <p className="quick-add-label">New {selectionInfo.title}</p>
                                        <input
                                            autoFocus
                                            placeholder="Name"
                                            value={this.state.quickAddName}
                                            onChange={e => this.setState({ quickAddName: e.target.value })}
                                        />
                                        <textarea
                                            placeholder="Description"
                                            value={this.state.quickAddDesc}
                                            onChange={e => this.setState({ quickAddDesc: e.target.value })}
                                            rows="2"
                                        />
                                        {(qaConfig.extraFields || []).map(field => (
                                            <input
                                                key={field.name}
                                                placeholder={field.label}
                                                value={this.state.quickAddExtra[field.name] || ''}
                                                onChange={e => this.setState({
                                                    quickAddExtra: { ...this.state.quickAddExtra, [field.name]: e.target.value }
                                                })}
                                            />
                                        ))}
                                        <div className="quick-add-actions">
                                            <button type="button" onClick={() => this.submitQuickAdd(selectOption)}>
                                                + Add {selectionInfo.title}
                                            </button>
                                            <button type="button" className="quick-add-cancel" onClick={() => this.setState({ quickAddActive: null })}>
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <button type="button" className="quick-add-trigger" onClick={() => this.openQuickAdd(selectOption)}>
                                        + New {selectionInfo.title}
                                    </button>
                                )
                            )}
                        </div>
                    );
                })}
                <button onClick={this.props.submitLineEntry}>Submit</button>
            </div>
        );
    }
}
