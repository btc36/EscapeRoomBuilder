

export class FrontEndDAO {

    constructor(makeRESTCall, userId, gameId) {
        this.makeRESTCall = makeRESTCall;
        this.userId = userId;
        this.gameId = gameId;
        this.getUsers = this.getUsers.bind(this);
        this.getGames = this.getGames.bind(this);
        this.getStages = this.getStages.bind(this);
        this.updateStage = this.updateStage.bind(this);
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
}
