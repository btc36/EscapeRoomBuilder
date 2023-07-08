

export class FrontEndDAO {

    constructor(makeRESTCall, userId, gameId) {
        this.makeRESTCall = makeRESTCall;
        this.userId = userId;
        this.gameId = gameId;
        this.getUsers = this.getUsers.bind(this);
        this.getGames = this.getGames.bind(this);
        this.getStages = this.getStages.bind(this);
        this.addStage = this.addStage.bind(this);
        this.updateStage = this.updateStage.bind(this);
        this.removeStage = this.removeStage.bind(this);
        this.getLockTypes = this.getLockTypes.bind(this);
        this.addLockType = this.addLockType.bind(this);
        this.updateLockType = this.updateLockType.bind(this);
        this.removeLockType = this.removeLockType.bind(this);
        this.getLocks = this.getLocks.bind(this);
        this.addLock = this.addLock.bind(this);
        this.updateLock = this.updateLock.bind(this);
        this.removeLock = this.removeLock.bind(this);
        this.getPuzzles = this.getPuzzles.bind(this);
        this.addPuzzle = this.addPuzzle.bind(this);
        this.updatePuzzle = this.updatePuzzle.bind(this);
        this.removePuzzle = this.removePuzzle.bind(this);
        this.getPropNLocations = this.getPropNLocations.bind(this);
        this.addPropNLocation = this.addPropNLocation.bind(this);
        this.updatePropNLocation = this.updatePropNLocation.bind(this);
        this.removePropNLocation = this.removePropNLocation.bind(this);
        this.getItems = this.getItems.bind(this);
        this.addItem = this.addItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    async getUsers(userId) {
        var myUsersInfo;
        var parameters = {};
        await this.makeRESTCall(
            'escaperoomdao?methodName=getUsers&parameters=' + JSON.stringify(parameters),
            'get',
            null,
            (usersInfo) => {
                console.log("TESTING", myUsersInfo);
                myUsersInfo = usersInfo;
            },
            (title, error) => {
                console.log('Check Version Num Error:', error);
                //Do we want an error? Without internet, they can't do anything anyway
            },
            () => {
                console.log("Nothing to see here");
            }
        );
        return myUsersInfo;
    }

    async getGames() {
        var myExistingGamesInfo;
        var parameters = {
            userId: this.userId
        };
        await this.makeRESTCall(
            'escaperoomdao?methodName=getGames&parameters=' + JSON.stringify(parameters),
            'get',
            null,
            (existingGamesInfo) => {
                console.log("TESTING GAMES", existingGamesInfo);
                myExistingGamesInfo = existingGamesInfo;
            },
            (title, error) => {
                console.log('Check Version Num Error:', error);
                //Do we want an error? Without internet, they can't do anything anyway
            },
            () => {
                console.log("Nothing to see here");
            }
        );
        return myExistingGamesInfo;
    }

    async addGame(userId, name, description) {
        var addGameInfo;
        var parameters = {
            userId: userId,
            name: name,
            description: description
        };
        await this.makeRESTCall(
            'escaperoomdao?methodName=addGame&parameters=' + JSON.stringify(parameters),
            'get',
            null,
            (addGameInfo) => {
                console.log("TESTING", addGameInfo);
                addGameInfo = addGameInfo;
            },
            (title, error) => {
                console.log('Check Version Num Error:', error);
                //Do we want an error? Without internet, they can't do anything anyway
            },
            () => {
                console.log("Nothing to see here");
            }
        );
        return addGameInfo;
    }

    async getStages() {
        var getStagesInfo;
        var parameters = {
            gameId: this.gameId
        };
        await this.makeRESTCall(
            'escaperoomdao?methodName=getStages&parameters=' + JSON.stringify(parameters),
            'get',
            null,
            (getStagesResponse) => {
                console.log("TESTING STAGES", getStagesResponse);
                getStagesInfo = getStagesResponse;
            },
            (title, error) => {
                console.log('Check Version Num Error:', error);
                //Do we want an error? Without internet, they can't do anything anyway
            },
            () => {
                console.log("Nothing to see here");
            }
        );
        return getStagesInfo;
    }

    async updateStage(editData) {
        var updateStageInfo;
        var parameters = {
            gameId: this.gameId,
            stageId: editData.lineId,
            name: editData.name,
            description: editData.description
        };
        await this.makeRESTCall(
            'escaperoomdao?methodName=updateStage&parameters=' + JSON.stringify(parameters),
            'get',
            null,
            (updateStageResponse) => {
                console.log("Update Stage", updateStageResponse);
                updateStageInfo = updateStageResponse;
            },
            (title, error) => {
                //Do we want an error? Without internet, they can't do anything anyway
            },
            () => {
                console.log("Nothing to see here");
            }
        );
        return updateStageInfo;
    }

    async addStage(editData) {
        var addStageInfo;
        var parameters = {
            gameId: this.gameId,
            name: editData.name,
            description: editData.description
        };
        await this.makeRESTCall(
            'escaperoomdao?methodName=addStage&parameters=' + JSON.stringify(parameters),
            'get',
            null,
            (addStageResponse) => {
                console.log("Add Stage", addStageResponse);
                addStageInfo = addStageResponse;
            },
            (title, error) => {
                //Do we want an error? Without internet, they can't do anything anyway
            },
            () => {
                console.log("Nothing to see here");
            }
        );
        return addStageInfo;
    }

    async removeStage(stageId) {
        var removeStageInfo;
        var parameters = {
            gameId: this.gameId,
            stageId: stageId,
            remove: true
        };
        await this.makeRESTCall(
            'escaperoomdao?methodName=updateStage&parameters=' + JSON.stringify(parameters),
            'get',
            null,
            (removeStageResponse) => {
                console.log("Remove Stage", removeStageResponse);
                removeStageInfo = removeStageResponse;
            },
            (title, error) => {
                //Do we want an error? Without internet, they can't do anything anyway
            },
            () => {
                console.log("Nothing to see here");
            }
        );
        return removeStageInfo;
    }

    async getLockTypes() {
        var getLockTypesInfo;
        var parameters = {
            gameId: this.gameId
        };
        await this.makeRESTCall(
            'escaperoomdao?methodName=getLockTypes&parameters=' + JSON.stringify(parameters),
            'get',
            null,
            (getLockTypesResponse) => {
                console.log("TESTING STAGES", getLockTypesResponse);
                getLockTypesInfo = getLockTypesResponse;
            },
            (title, error) => {
                console.log('Check Version Num Error:', error);
                //Do we want an error? Without internet, they can't do anything anyway
            },
            () => {
                console.log("Nothing to see here");
            }
        );
        return getLockTypesInfo;
    }

    async updateLockType(editData) {
        var updateLockTypeInfo;
        var parameters = {
            gameId: this.gameId,
            lockTypeId: editData.lineId,
            name: editData.name,
            description: editData.description
        };
        await this.makeRESTCall(
            'escaperoomdao?methodName=updateLockType&parameters=' + JSON.stringify(parameters),
            'get',
            null,
            (updateLockTypeResponse) => {
                console.log("Update Lock Type", updateLockTypeResponse);
                updateLockTypeInfo = updateLockTypeResponse;
            },
            (title, error) => {
                //Do we want an error? Without internet, they can't do anything anyway
            },
            () => {
                console.log("Nothing to see here");
            }
        );
        return updateLockTypeInfo;
    }

    async addLockType(editData) {
        var addLockTypeInfo;
        var parameters = {
            gameId: this.gameId,
            name: editData.name,
            description: editData.description
        };
        await this.makeRESTCall(
            'escaperoomdao?methodName=addLockType&parameters=' + JSON.stringify(parameters),
            'get',
            null,
            (addLockTypeResponse) => {
                console.log("Add Lock Type", addLockTypeResponse);
                addLockTypeInfo = addLockTypeResponse;
            },
            (title, error) => {
                //Do we want an error? Without internet, they can't do anything anyway
            },
            () => {
                console.log("Nothing to see here");
            }
        );
        return addLockTypeInfo;
    }

    async removeLockType(lockTypeId) {
        var removeLockTypeInfo;
        var parameters = {
            gameId: this.gameId,
            lockTypeId: lockTypeId,
            remove: true
        };
        await this.makeRESTCall(
            'escaperoomdao?methodName=updateLockType&parameters=' + JSON.stringify(parameters),
            'get',
            null,
            (removeLockTypeResponse) => {
                console.log("Remove Lock Type", removeLockTypeResponse);
                removeLockTypeInfo = removeLockTypeResponse;
            },
            (title, error) => {
                //Do we want an error? Without internet, they can't do anything anyway
            },
            () => {
                console.log("Nothing to see here");
            }
        );
        return removeLockTypeInfo;
    }


    async getLocks() {
        var getLocksInfo;
        var parameters = {
            gameId: this.gameId
        };
        await this.makeRESTCall(
            'escaperoomdao?methodName=getLocks&parameters=' + JSON.stringify(parameters),
            'get',
            null,
            (getLocksResponse) => {
                console.log("TESTING Locks", getLocksResponse);
                getLocksInfo = getLocksResponse;
            },
            (title, error) => {
                console.log('Check Version Num Error:', error);
                //Do we want an error? Without internet, they can't do anything anyway
            },
            () => {
                console.log("Nothing to see here");
            }
        );
        return getLocksInfo;
    }

    async updateLock(editData) {
        var updateLockInfo;
        var parameters = {
            gameId: this.gameId,
            lockId: editData.lineId,
            name: editData.name,
            description: editData.description,
            combo: editData.additionalInputs.combo,
            lockTypeId: editData.additionalSelections.lockType.value
        };
        await this.makeRESTCall(
            'escaperoomdao?methodName=updateLock&parameters=' + JSON.stringify(parameters),
            'get',
            null,
            (updateLockReponse) => {
                console.log("Update Lock", updateLockReponse);
                updateLockInfo = updateLockReponse;
            },
            (title, error) => {
                //Do we want an error? Without internet, they can't do anything anyway
            },
            () => {
                console.log("Nothing to see here");
            }
        );
        return updateLockInfo;
    }

    async addLock(editData) {
        var addLockInfo;
        console.log("ADD LOCK",editData)
        var parameters = {
            gameId: this.gameId,
            name: editData.name,
            description: editData.description,
            combo: editData.additionalInputs.combo,
            lockTypeId: editData.additionalSelections.lockType.value
        };
        await this.makeRESTCall(
            'escaperoomdao?methodName=addLock&parameters=' + JSON.stringify(parameters),
            'get',
            null,
            (addLockResponse) => {
                console.log("Add Lock", addLockResponse);
                addLockInfo = addLockResponse;
            },
            (title, error) => {
                //Do we want an error? Without internet, they can't do anything anyway
            },
            () => {
                console.log("Nothing to see here");
            }
        );
        return addLockInfo;
    }

    async removeLock(lockId) {
        var removeLockInfo;
        var parameters = {
            gameId: this.gameId,
            lockId: lockId,
            remove: true
        };
        await this.makeRESTCall(
            'escaperoomdao?methodName=updateLock&parameters=' + JSON.stringify(parameters),
            'get',
            null,
            (removeLockResponse) => {
                console.log("Remove Lock Response", removeLockResponse);
                removeLockInfo = removeLockResponse;
            },
            (title, error) => {
                //Do we want an error? Without internet, they can't do anything anyway
            },
            () => {
                console.log("Nothing to see here");
            }
        );
        return removeLockInfo;
    }

    async getPuzzles() {
        var getPuzzlesInfo;
        var parameters = {
            gameId: this.gameId
        };
        await this.makeRESTCall(
            'escaperoomdao?methodName=getPuzzles&parameters=' + JSON.stringify(parameters),
            'get',
            null,
            (getPuzzlesReponse) => {
                console.log("TESTING Puzzles", getPuzzlesReponse);
                getPuzzlesInfo = getPuzzlesReponse;
            },
            (title, error) => {
                console.log('Check Version Num Error:', error);
                //Do we want an error? Without internet, they can't do anything anyway
            },
            () => {
                console.log("Nothing to see here");
            }
        );
        return getPuzzlesInfo;
    }

    async updatePuzzle(editData) {
        var updatePuzzleInfo;
        var parameters = {
            gameId: this.gameId,
            puzzleId: editData.lineId,
            name: editData.name,
            description: editData.description,
            lockId: editData.additionalSelections.lock.value,
            stageId: editData.additionalSelections.stage.value,
            puzzleItems: editData.additionalSelections.puzzleItem.value ? editData.additionalSelections.puzzleItem.value.split(",") : []
        };
        await this.makeRESTCall(
            'escaperoomdao?methodName=updatePuzzle&parameters=' + JSON.stringify(parameters),
            'get',
            null,
            (updatePuzzleReponse) => {
                console.log("Update Puzzle", updatePuzzleReponse);
                updatePuzzleInfo = updatePuzzleReponse;
            },
            (title, error) => {
                //Do we want an error? Without internet, they can't do anything anyway
            },
            () => {
                console.log("Nothing to see here");
            }
        );
        return updatePuzzleInfo;
    }

    async addPuzzle(editData) {
        var addPuzzleInfo;
        console.log("ADD LOCK", editData)
        var parameters = {
            gameId: this.gameId,
            name: editData.name,
            description: editData.description,
            lockId: editData.additionalSelections.lock.value,
            stageId: editData.additionalSelections.stage.value,
            puzzleItems: editData.additionalSelections.puzzleItem.value ? editData.additionalSelections.puzzleItem.value.split() : []
        };
        await this.makeRESTCall(
            'escaperoomdao?methodName=addPuzzle&parameters=' + JSON.stringify(parameters),
            'get',
            null,
            (addPuzzleResponse) => {
                console.log("Add Puzzle", addPuzzleResponse);
                addPuzzleInfo = addPuzzleResponse;
            },
            (title, error) => {
                //Do we want an error? Without internet, they can't do anything anyway
            },
            () => {
                console.log("Nothing to see here");
            }
        );
        return addPuzzleInfo;
    }

    async removePuzzle(puzzleId) {
        var removePuzzleInfo;
        var parameters = {
            gameId: this.gameId,
            puzzleId: puzzleId,
            puzzleItems: [],
            remove: true
        };
        await this.makeRESTCall(
            'escaperoomdao?methodName=updatePuzzle&parameters=' + JSON.stringify(parameters),
            'get',
            null,
            (removePuzzleResponse) => {
                console.log("Remove Puzzle Response", removePuzzleResponse);
                removePuzzleInfo = removePuzzleResponse;
            },
            (title, error) => {
                //Do we want an error? Without internet, they can't do anything anyway
            },
            () => {
                console.log("Nothing to see here");
            }
        );
        return removePuzzleInfo;
    }

    async getPropNLocations() {
        var getPropNLocationsInfo;
        var parameters = {
            gameId: this.gameId
        };
        await this.makeRESTCall(
            'escaperoomdao?methodName=getPropNLocations&parameters=' + JSON.stringify(parameters),
            'get',
            null,
            (getPropNLocationsResponse) => {
                console.log("TESTING PropNLocations", getPropNLocationsResponse);
                getPropNLocationsInfo = getPropNLocationsResponse;
            },
            (title, error) => {
                console.log('Check Version Num Error:', error);
                //Do we want an error? Without internet, they can't do anything anyway
            },
            () => {
                console.log("Nothing to see here");
            }
        );
        return getPropNLocationsInfo;
    }

    async updatePropNLocation(editData) {
        var updatePropNLocationInfo;
        var parameters = {
            gameId: this.gameId,
            propId: editData.lineId,
            name: editData.name,
            description: editData.description,
            parent: editData.additionalSelections.parent.value,
            puzzleId: editData.additionalSelections.puzzle.value
        };
        await this.makeRESTCall(
            'escaperoomdao?methodName=updatePropNLocation&parameters=' + JSON.stringify(parameters),
            'get',
            null,
            (updatePropNLocationResponse) => {
                console.log("Update PropNLocation", updatePropNLocationResponse);
                updatePropNLocationInfo = updatePropNLocationResponse;
            },
            (title, error) => {
                //Do we want an error? Without internet, they can't do anything anyway
            },
            () => {
                console.log("Nothing to see here");
            }
        );
        return updatePropNLocationInfo;
    }

    async addPropNLocation(editData) {
        var addPropNLocationInfo;
        console.log("ADD LOCK", editData)
        var parameters = {
            gameId: this.gameId,
            name: editData.name,
            description: editData.description,
            parent: editData.additionalSelections.parent.value,
            puzzleId: editData.additionalSelections.puzzle.value
        };
        await this.makeRESTCall(
            'escaperoomdao?methodName=addPropNLocation&parameters=' + JSON.stringify(parameters),
            'get',
            null,
            (addPropNLocationResponse) => {
                console.log("Add PropNLocation", addPropNLocationResponse);
                addPropNLocationInfo = addPropNLocationResponse;
            },
            (title, error) => {
                //Do we want an error? Without internet, they can't do anything anyway
            },
            () => {
                console.log("Nothing to see here");
            }
        );
        return addPropNLocationInfo;
    }

    async removePropNLocation(propNLocation) {
        var removePropNLocationInfo;
        var parameters = {
            gameId: this.gameId,
            propId: propNLocation,
            remove: true
        };
        await this.makeRESTCall(
            'escaperoomdao?methodName=updatePropNLocation&parameters=' + JSON.stringify(parameters),
            'get',
            null,
            (removePropNlocationResponse) => {
                console.log("Remove PropNLocation Response", removePropNlocationResponse);
                removePropNLocationInfo = removePropNlocationResponse;
            },
            (title, error) => {
                //Do we want an error? Without internet, they can't do anything anyway
            },
            () => {
                console.log("Nothing to see here");
            }
        );
        return removePropNLocationInfo;
    }

    async getItems() {
        var getItemsInfo;
        var parameters = {
            gameId: this.gameId
        };
        await this.makeRESTCall(
            'escaperoomdao?methodName=getItems&parameters=' + JSON.stringify(parameters),
            'get',
            null,
            (getItemsResponse) => {
                console.log("TESTING Items", getItemsResponse);
                getItemsInfo = getItemsResponse;
            },
            (title, error) => {
                console.log('Check Version Num Error:', error);
                //Do we want an error? Without internet, they can't do anything anyway
            },
            () => {
                console.log("Nothing to see here");
            }
        );
        return getItemsInfo;
    }

    async updateItem(editData) {
        var updateItemInfo;
        var parameters = {
            gameId: this.gameId,
            itemId: editData.lineId,
            name: editData.name,
            description: editData.description,
            propId: editData.additionalSelections.location.value
        };
        await this.makeRESTCall(
            'escaperoomdao?methodName=updateItem&parameters=' + JSON.stringify(parameters),
            'get',
            null,
            (updateItemResponse) => {
                console.log("Update Item", updateItemResponse);
                updateItemInfo = updateItemResponse;
            },
            (title, error) => {
                //Do we want an error? Without internet, they can't do anything anyway
            },
            () => {
                console.log("Nothing to see here");
            }
        );
        return updateItemInfo;
    }

    async addItem(editData) {
        var addItemInfo;
        console.log("ADD LOCK", editData)
        var parameters = {
            gameId: this.gameId,
            name: editData.name,
            description: editData.description,
            propId: editData.additionalSelections.location.value
        };
        await this.makeRESTCall(
            'escaperoomdao?methodName=addItem&parameters=' + JSON.stringify(parameters),
            'get',
            null,
            (addItemReponse) => {
                console.log("Add Item", addItemReponse);
                addItemInfo = addItemReponse;
            },
            (title, error) => {
                //Do we want an error? Without internet, they can't do anything anyway
            },
            () => {
                console.log("Nothing to see here");
            }
        );
        return addItemInfo;
    }

    async removeItem(item) {
        var removeItemInfo;
        var parameters = {
            gameId: this.gameId,
            itemId: item,
            remove: true
        };
        await this.makeRESTCall(
            'escaperoomdao?methodName=updateItem&parameters=' + JSON.stringify(parameters),
            'get',
            null,
            (removeItemResponse) => {
                console.log("Remove Item Response", removeItemResponse);
                removeItemInfo = removeItemResponse;
            },
            (title, error) => {
                //Do we want an error? Without internet, they can't do anything anyway
            },
            () => {
                console.log("Nothing to see here");
            }
        );
        return removeItemInfo;
    }
}
