

export class FrontEndDAO {

    constructor(makeRESTCall) {
        this.makeRESTCall = makeRESTCall;
        this.getExistingGames = this.getExistingGames.bind(this);
    }

    async getExistingGames(userId) {
        var myExistingGamesInfo;
        await this.makeRESTCall(
            'escaperoomdao',
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
