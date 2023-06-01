

export class FrontEndDAO {

    constructor(makeRESTCall) {
        this.makeRESTCall = makeRESTCall;
        this.getUsers = this.getUsers.bind(this);
    }

    async getUsers(userId) {
        var myExistingGamesInfo;
        var parameters = {};
        await this.makeRESTCall(
            'escaperoomdao?methodName=getUsers&parameters=' + JSON.stringify(parameters),
            'get',
            null,
            (existingGamesInfo) => {
                console.log("TESTING", existingGamesInfo);
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

}
