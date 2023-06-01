namespace EscapeRoomApplication.Objects.Tables
{
    public class Game
    {
        public Game(int gameId, string name, int user)
        {
            this.gameId = gameId;
            this.name = name;
            this.user = user;
        }

        public int gameId { get; set; }
        public string name { get; set; }
       
        public int user { get; set; }
    }
}
