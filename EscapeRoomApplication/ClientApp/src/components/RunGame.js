import React, { Component } from 'react';
import Countdown from 'react-countdown';
import ProgressBar from "@ramonak/react-progress-bar";
import { Audio } from './Widgets/Audio';
import { DialogMessage } from './Widgets/DialogMessage';
//import { Fireworks } from 'fireworks-js'
import confetti from 'canvas-confetti';
export class RunGame extends Component {

  constructor(props) {
    super(props);
      this.state = {
          numPuzzles: 1,
          puzzles: [],
          puzzleItems: [],
          items: [],
          locations: [],
          clues: [],
          givenClues: [],
          stages: [],
          unlockedLocations: [],
          solvablePuzzles: [],
          solvedPuzzles: [1,1,1,1,1,1,1,1,1,1],
          clueDict: {},
          locationsDict: {},
          locationItems: {},
          puzzleItemsDict: {},
          puzzleCodeDict: {},
          backpack: [],
          currentStage: "",
          puzzleCode: "",
          showDialog: false,
          dialogTitle: "",
          dialogContent: "",
          actionDialog: false,
          isErrorMessage: false,
          dialogFullScreen: false
      };
      if (!this.props.runningGame) {
          this.props.startRunningGame();
      }
     
      this.getFullGameInfo = this.getFullGameInfo.bind(this);
      this.getInitalValues = this.getInitalValues.bind(this);
      this.updatePuzzleCode = this.updatePuzzleCode.bind(this);
      this.submitPuzzleCode = this.submitPuzzleCode.bind(this);
      this.getClue = this.getClue.bind(this);
      this.startTimer = this.startTimer.bind(this);
      this.startVictory = this.startVictory.bind(this);
      this.makeConfetti = this.makeConfetti.bind(this);
      this.playFailure = this.playFailure.bind(this);
      this.playSuccess = this.playSuccess.bind(this);
      this.closeDialog = this.closeDialog.bind(this);
      this.getTimeElapsed = this.getTimeElapsed.bind(this);
      this.getFullGameInfo();
    }

  

    async getFullGameInfo() {
        var gameInfo = await this.props.FrontEndDAO.getFullGameInfo();
        this.getInitalValues(gameInfo);
    }


    getInitalValues(gameInfo) {
        var puzzles = gameInfo.puzzles;
        var puzzleItems = gameInfo.puzzleItems;
        var items = gameInfo.items;
        var locations = gameInfo.propNLocations;
        var clues = gameInfo.clues;
        var stages = gameInfo.stages;
        var accessedLocations = [];
        var solvablePuzzles = [];
        var clueDict = {};
        var locationsDict = {};
        var locationItems = {};
        var puzzleItemsDict = {};
        var puzzleCodeDict = {};
        var backpack = [];
        for (var i in items) {
            var item = items[i];
            var itemLocation = item.location;
            var locationInfo = locationsDict[itemLocation];
            if (!locationInfo) {
                for (var j in locations) {
                    var location = locations[j];
                    if (location.id_props == itemLocation) {
                        locationsDict[itemLocation] = location;
                        locationInfo = location;
                        break;
                    }
                }
            }
            if (!locationItems[locationInfo.id_props]){
                locationItems[locationInfo.id_props] = [];
            }
            locationItems[locationInfo.id_props].push(item.id_items); 
            var accessPuzzle = locationInfo.access_puzzle;
            if (accessPuzzle > 0) {
                continue;
            }
            var parentLocation = locationInfo.parent_prop;
            var hiddenItem;
            while (parentLocation > 0) {
                var oldParentLocation = parentLocation;
                parentLocation = -1;
                if (!locationItems[oldParentLocation]) {
                    locationItems[oldParentLocation] = [];
                }
                locationItems[oldParentLocation].push(item.id_items);
                for (var k in locations) {
                    var location = locations[j];
                    if (location.id_props == oldParentLocation) {
                        hiddenItem = location.access_puzzle;
                        parentLocation = location.parent_prop;
                        break;
                    }
                }
            }
            if (hiddenItem > 0) {
                continue;
            }
            backpack.push(item.id_items); 
        }
        for (var i in puzzleItems) {
            var puzzle = puzzleItems[i].puzzle;
            var item = puzzleItems[i].item;
            if (!puzzleItemsDict[puzzle]) {
                puzzleItemsDict[puzzle] = [];
            }
            puzzleItemsDict[puzzle].push(item);
        }
        for (var puzzleId in puzzleItemsDict) {
            var neededItems = puzzleItemsDict[puzzleId];
            var containsAll = neededItems.every(element => {
                return backpack.includes(element);
            });
            if (containsAll) {
                solvablePuzzles.push(puzzleId.toString());
            }
        }
        for (var i in clues) {
            var cluePuzzle = clues[i].puzzle;
            if (solvablePuzzles.indexOf(cluePuzzle.toString()) > -1) {
                if (!clueDict[cluePuzzle]) {
                    clueDict[cluePuzzle] = [];
                }
                clueDict[cluePuzzle].push(clues[i].clue_text)
            }
        }
        for (var i in puzzles) {
            var puzzle = puzzles[i];
            puzzleCodeDict[puzzle.puzzle_code] = puzzle.id_puzzles;
        }
        this.setState({
            puzzles: puzzles,
            numPuzzles: puzzles.length,
            puzzleItems: puzzleItems,
            items: items,
            locations: gameInfo.propNLocations,
            clues: gameInfo.clues,
            stages: gameInfo.stages,
            accessedLocations: accessedLocations,
            solvablePuzzles: solvablePuzzles,
            clueDict:clueDict,
            locationsDict: locationsDict,
            locationItems: locationItems,
            puzzleItemsDict: puzzleItemsDict,
            puzzleCodeDict: puzzleCodeDict,
            backpack: backpack
        });
    }

    updatePuzzleCode(e) {
        this.setState({
            puzzleCode: e.target.value
        })
    }

    submitPuzzleCode() {
        var puzzleCode = this.state.puzzleCode;
        if (typeof puzzleCode == 'string') {
            puzzleCode = puzzleCode.toLowerCase();
        }
        var puzzleCodeDict = this.state.puzzleCodeDict;
        var clues = this.state.clues;
        var solvedPuzzles = this.state.solvedPuzzles;
        var clueDict = {};
        if (!puzzleCodeDict[puzzleCode] || solvedPuzzles.indexOf(puzzleCodeDict[puzzleCode].toString()) > -1) {
            this.playFailure();
        }
        else {
            this.playSuccess();
            var puzzle = puzzleCodeDict[puzzleCode];
            var puzzleItemsDict = this.state.puzzleItemsDict; 
            var solvablePuzzles = this.state.solvablePuzzles;
            solvedPuzzles.push(puzzle.toString());
            var puzzleIndex = solvablePuzzles.indexOf(puzzle.toString());
            solvablePuzzles.splice(puzzleIndex, 1);
            var locations = this.state.locations;
            var backpack = this.state.backpack;
            var unlockedLocations = this.state.unlockedLocations;
            for (var i in locations) {
                var location = locations[i];
                if (location.access_puzzle == puzzle) {
                    unlockedLocations.push(location.id_props);
                    var hasChild = true;
                    while (hasChild) {
                        hasChild = false;
                        for (var j in locations) {
                            var sublocation = locations[j];
                            if (unlockedLocations.indexOf(sublocation.parent_prop.toString()) > -1 && unlockedLocations.indexOf(sublocation.id_props.toString()) == -1) {
                                unlockedLocations.push(sublocation.id_props)
                                hasChild = true;
                            }   
                        }
                    } 
                }
            }
            var items = this.state.items;
            if (unlockedLocations.length > 0) {
                for (var i in items) {
                    var item = items[i];
                    if (unlockedLocations.indexOf(item.location) > -1 && backpack.indexOf(item.id_items) == -1) {
                        backpack.push(item.id_items);
                    }
                }
            }
            for (var puzzleId in puzzleItemsDict) {
                var neededItems = puzzleItemsDict[puzzleId];
                var containsAll = neededItems.every(element => {
                    return backpack.includes(element);
                });
                if (containsAll && solvablePuzzles.indexOf(puzzleId) == -1 && solvedPuzzles.indexOf(puzzleId) == -1) {
                    solvablePuzzles.push(puzzleId.toString());
                }
            }
            for (var i in clues) {
                var cluePuzzle = clues[i].puzzle;
                if (solvablePuzzles.indexOf(cluePuzzle.toString()) > -1) {
                    if (!clueDict[cluePuzzle]) {
                        clueDict[cluePuzzle] = [];
                    }
                    clueDict[cluePuzzle].push(clues[i].clue_text)
                }
            }
            this.setState({
                puzzleCodeDict: puzzleCodeDict,
                puzzleItemsDict: puzzleItemsDict,
                solvablePuzzles: solvablePuzzles,
                solvedPuzzles: solvedPuzzles,
                backpack: backpack,
                unlockedLocations: unlockedLocations,
                clueDict: clueDict
            })
        }
        this.setState({
            puzzleCode: ""
        })
    }

    getClue() {
        var clues = this.state.clueDict;
        var solvablePuzzles = this.state.solvablePuzzles;
        var solvedPuzzles = this.state.solvedPuzzles;
        var givenClues = this.state.givenClues;
        var clueFound = false;
        var clueText = '';
        var defaultClue = "";
        for (var puzzleId in clues) {
            if (solvedPuzzles.indexOf(puzzleId) > -1) {
                continue;
            }
            var puzzleClues = clues[puzzleId];
            for (var i in puzzleClues) {
                var clue = puzzleClues[i];
                if (!defaultClue) {
                    defaultClue = clue;
                }
                if (givenClues.indexOf(clue) == -1) {
                    clueFound = true;
                    clueText = clue;
                    givenClues.push(clue);
                    break;
                }
            }
            if (clueFound) {
                break;
            }
        }
        if (!clueFound) {
            if (!defaultClue) {
                defaultClue = "You have solved all available puzzles, look for a code to enter.";
            }
            clueText = defaultClue;
            givenClues = [clueText];
        }
        this.setState({
            showDialog: true,
            dialogTitle: "Here is a clue:",
            dialogContent: <h1>{clueText}</h1>,
            actionDialog: false,
            isErrorMessage: false,
            dialogFullScreen: false,
            givenClues: givenClues
        })
    }

    startTimer() {
      this.props.startTimer();
    }

    makeConfetti() {
        confetti({
            particleCount: 100,
            startVelocity: 30,
            spread: 360,
            origin: {
                x: Math.random(),
                // since they fall down, start a bit higher than random
                y: Math.random() - 0.2
            }
        });
    }

    startVictory() {
        this.makeConfetti();
        this.makeConfetti();
        this.makeConfetti();
        this.makeConfetti();
        this.makeConfetti();
        setTimeout(() => { document.getElementById("victory-button").click()},2000);
    }

    playFailure() {
        const audioElbadISBN = document.getElementsByClassName("audio-element-failure")[0];
        if (audioElbadISBN.paused) {
            audioElbadISBN.play();
        } else {
            audioElbadISBN.currentTime = 0
        }
    }

    playSuccess() {
        const audioEl = document.getElementsByClassName("audio-element")[0];
        if (audioEl.paused) {
            audioEl.play();
        } else {
            audioEl.currentTime = 0
        }
    }

    closeDialog() {
        this.setState({
            showDialog: false,
            dialogTitle: "",
            dialogContent: "",
            actionDialog: false,
            isErrorMessage: false,
            dialogFullScreen: false
        })
    }

    getTimeElapsed(startTime) {
        if (!startTime) {
            return "N/A";
        }
        var dateFuture = Date.now();
        var dateNow = startTime;

        var seconds = Math.floor((dateFuture - (dateNow)) / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        var days = Math.floor(hours / 24);

        hours = hours - (days * 24);
        minutes = minutes - (days * 24 * 60) - (hours * 60);
        seconds = seconds - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60);
        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        var timeElapsed = minutes + ":" + seconds;
        if (hours != "00") {
            timeElapsed = hours + ":" + timeElapsed;
        }
        return timeElapsed;
    }

    render() {
        var percentComplete = (this.state.solvedPuzzles.length / this.state.numPuzzles) * 100;
        percentComplete = Math.round(percentComplete);
        if (percentComplete == 100) {
            document.getElementById("victory-button").click();
        }
        var barColor = '#00FF00';
        if (percentComplete < 50) {
            barColor = '#AA4A44';
        }
        else if (percentComplete < 80) {
            barColor = '#FBCEB1';
        }
        var timeElapsed = this.getTimeElapsed(this.props.startTime);
        return (
        //SHOW WHAT THE TIME SPENT WAS
        <div className="runGamePage">
            <Audio />
            <DialogMessage
                closeDialog={this.closeDialog}
                showDialog={this.state.showDialog}
                dialogTitle={this.state.dialogTitle}
                dialogContent={this.state.dialogContent}
                actionDialog={this.state.actionDialog}
                isErrorMessage={this.state.isErrorMessage}
                dialogFullScreen={this.state.dialogFullScreen}
            />
            {
                percentComplete < 100
                ?
                <div className="countdown">
                {this.props.countdown}
                </div>
                :
                <div>
                        <h1 className='victory-text'>Winner!!!!</h1>
                        <h3 className='timeelapsed'>You Beat the Game in {timeElapsed}</h3>
                </div>
            }
            
            <ProgressBar
                completed={percentComplete}
                bgColor={barColor}
                height={"30px"}
            />
            <br /><br />
            {
                this.props.countdown == "01:00:00"
                &&
                <button onClick={this.startTimer}>Start Timer</button>
            }
            {
                percentComplete < 100
                &&
                <div>
                    <button onClick={this.getClue}>Get Clue</button>
                    <input className="puzzleCode" value={this.state.puzzleCode} onChange={(e) => { this.updatePuzzleCode(e) }} type="text" />
                    <button onClick={this.submitPuzzleCode}>Submit Code</button>
                </div>
                }
            <button id="victory-button" onClick={this.startVictory} hidden>VICTORY</button>
      </div>
    );
  }
}
