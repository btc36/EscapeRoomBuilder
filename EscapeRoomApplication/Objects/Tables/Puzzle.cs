namespace EscapeRoomApplication.Objects
{
    public class Puzzle
    {
        public Puzzle(int id_puzzles, string name, string description, int stage, int _lock)
        {
            this.id_puzzles = id_puzzles;
            this.name = name;
            this.description = description;
            this.stage = stage;
            this.lock_solved = _lock;
        }

        public int id_puzzles { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public int stage { get; set; }
        public int lock_solved { get; set; }
    }
}
