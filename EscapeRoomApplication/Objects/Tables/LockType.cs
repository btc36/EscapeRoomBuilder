namespace EscapeRoomApplication.Objects.Tables
{
    public class LockType
    {
        public LockType(int id_lock_types, string name, string description)
        {
            this.id_lock_types = id_lock_types;
            this.name = name;
            this.description = description;
        }

        public int id_lock_types { get; set; }
        public string name { get; set; }
        public string description { get; set; }
    }
}
