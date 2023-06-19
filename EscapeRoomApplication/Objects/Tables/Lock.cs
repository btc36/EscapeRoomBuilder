namespace EscapeRoomApplication.Objects.Tables
{
    public class Lock
    {
        public Lock(int id_locks, string combo, int lock_type, string description, string name, int game)
        {
            this.id_locks = id_locks;
            this.combo = combo;
            this.lock_type = lock_type;
            this.description = description;
            this.name = name;
            this.game = game;
        }

        public int id_locks { get; set; }
        public string combo { get; set; }
        public int lock_type { get; set; }
        public string description { get; set; }
        public string name { get; set; }
        public int game { get; set; }
    }
}
