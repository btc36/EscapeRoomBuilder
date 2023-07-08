namespace EscapeRoomApplication.Objects.Tables
{
    public class Item
    {
        public Item(int id_items, string name, string description, int location, int game)
        {
            this.id_items = id_items;
            this.name = name;
            this.description = description;
            this.location = location;
            this.game = game;
        }

        public int id_items { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public int location { get; set; }
        public int game { get; set; }
    }
}
