namespace EscapeRoomApplication.Objects.Tables
{
    public class Game
    {
        public Game(int gameId, string name, string description, int user)
        {
            this.gameId = gameId;
            this.name = name;
            this.description = description;
            this.user = user;
            this.selected = false;
        }

        public int gameId { get; set; }
        public string name { get; set; }   
        public string description { get; set; }
        public int user { get; set; }
        public bool selected { get; set; }
    }
}
