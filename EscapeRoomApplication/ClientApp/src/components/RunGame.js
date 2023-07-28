import React, { Component } from 'react';
import Countdown from 'react-countdown';
import ProgressBar from "@ramonak/react-progress-bar";
import { Audio } from './Widgets/Audio';
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
          accessedLocations: [],
          solvablePuzzles: [],
          solvedPuzzles: [1,2],
          clueDict: {},
          locationsDict: {},
          locationItems: {},
          puzzleItemsDict: {},
          puzzleCodeDict: {},
          backpack: [],
          currentStage: "",
          puzzleCode: ""
      };
      if (!this.props.runningGame) {
          this.props.startRunningGame();
      }
     
      this.getFullGameInfo = this.getFullGameInfo.bind(this);
      this.getInitalValues = this.getInitalValues.bind(this);
      this.updatePuzzleCode = this.updatePuzzleCode.bind(this);
      this.submitPuzzleCode = this.submitPuzzleCode.bind(this);
      this.startTimer = this.startTimer.bind(this);
      this.playFailure = this.playFailure.bind(this);
      this.playSuccess = this.playSuccess.bind(this);
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
        console.log("MY STUFF")
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
        var puzzleCodeDict = this.state.puzzleCodeDict;
        var clues = this.state.clues;
        var clueDict = {};
        if (!puzzleCodeDict[puzzleCode]) {
            this.playFailure();
        }
        else {
            this.playSuccess();
            var puzzle = puzzleCodeDict[puzzleCode];
            var puzzleItemsDict = this.state.puzzleItemsDict; 
            var solvablePuzzles = this.state.solvablePuzzles;
            var solvedPuzzles = this.state.solvedPuzzles;
            solvedPuzzles.push(puzzle.toString());
            var puzzleIndex = solvablePuzzles.indexOf(puzzle.toString());
            solvablePuzzles.splice(puzzleIndex, 1);
            var locations = this.state.locations;
            var backpack = this.state.backpack;
            var unlockedLocations = [];
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
                clueDict: clueDict
            })
        }
        this.setState({
            puzzleCode: ""
        })
    }

    startTimer() {
      this.props.startTimer();
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

    render() {
        var percentComplete = (this.state.solvedPuzzles.length / this.state.numPuzzles) * 100;
        percentComplete = Math.round(percentComplete);
        var barColor = '#00FF00';
        if (percentComplete < 50) {
            barColor = '#AA4A44';
        }
        else if (percentComplete < 80) {
            barColor = '#FBCEB1';
        }
    return (
        <div className="runGamePage">
            <Audio />
            <h1>Run Game</h1>
            <div className="countdown">
                {this.props.countdown}
            </div>
            {
                this.props.countdown == "01:00:00"
                &&
                <button onClick={this.startTimer}>Start Timer</button>
            }
            <input className="puzzleCode" value={this.state.puzzleCode} onChange={(e) => { this.updatePuzzleCode(e) }} type="text" />
            <button onClick={this.submitPuzzleCode}>Submit</button>
            <ProgressBar
                completed={percentComplete}
                bgColor={barColor}
                height={"30px"}
            />
      </div>
    );
  }
}
