

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
}
