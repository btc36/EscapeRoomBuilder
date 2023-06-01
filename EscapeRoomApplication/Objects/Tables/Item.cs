namespace EscapeRoomApplication.Objects.Tables
{
    public class Item
    {
        public Item(int id_items, string name, string description, int location, string location_type)
        {
            this.id_items = id_items;
            this.name = name;
            this.description = description;
            this.location = location;
            this.location_type = location_type;
        }

        public int id_items { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public int location { get; set; }
        public string location_type { get; set; }
    }
}
