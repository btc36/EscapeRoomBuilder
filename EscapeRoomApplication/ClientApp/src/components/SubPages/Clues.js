import React, { Component } from 'react';
import { PageLink } from '../SubComponents/PageLink';
import { Loader } from '../Widgets/Loader';

export class Clues extends Component {

    constructor(props) {
        super(props);
    }
    render() {

        console.log("CLUES$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$", this.props.clues)
        var updateClueFunction = this.props.updateClue;
        var removeClueFunction = this.props.removeClue;
        var updateClueValueFunction = this.props.updateClueValue;
        var puzzleId = this.props.puzzleId;
        var puzzleName = this.props.puzzleName;
        return (
            <div className="escapeRoomPage">
                <textarea className="descriptionInput" id="newClue" type="text" rows="5" cols="60" name="clue"></textarea>
                <button onClick={() => { this.props.addClue(puzzleId, puzzleName)}}>Submit New Clue</button>
                <h3>Existing Clues</h3>
                <div>
                    <table className="escapeRoomPageTable">
                        <tbody>
                            {
                                this.props.clues.map(function (clue, idx) {
                                    return (
                                        <tr>
                                            <td>
                                                <textarea className="clueInput" defaultValue={clue.clue_text} onChange={(e) => { updateClueValueFunction(e, clue.id_clues) }} type="text" rows="5" cols="60" name="clue"></textarea>
                                            </td>
                                            <td><button onClick={() => updateClueFunction(clue.id_clues, puzzleId, puzzleName)}>Update</button></td>
                                            <td><button onClick={() => removeClueFunction(clue.id_clues, puzzleId, puzzleName)}>Remove</button></td>
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
