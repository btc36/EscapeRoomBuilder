namespace EscapeRoomApplication.Objects.Tables
{
    public class Stage
    {
        public Stage(int id_stages, string name, int order, int game)
        {
            this.id_stages = id_stages;
            this.name = name;
            this.order = order;
            this.game = game;
        }
        public int id_stages { get; set; }
        public string name { get; set; }
        public int order { get; set; }
        public int game { get; set; }
    }
}
