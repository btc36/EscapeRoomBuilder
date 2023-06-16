import React, { Component } from 'react';

export class DataEntry extends Component {

    constructor(props) {
        super(props)
        console.log("DATA ENTRY PROPS", props);
    }

    render() {
        console.log("EDIT DATA", this.props.editData);
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
                <button onClick={this.props.submitLineEntry}>Submit</button>
            </div>
        );
    }
}
