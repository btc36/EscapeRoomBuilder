namespace EscapeRoomApplication.Objects
{
    public class Puzzle
    {
        public Puzzle(int id_puzzles, string name, string description, int stage, int _lock, int game, int parent_puzzle)
        {
            this.id_puzzles = id_puzzles;
            this.name = name;
            this.description = description;
            this.stage = stage;
            this.lock_solved = _lock;
            this.game = game;
            this.parent_puzzle = parent_puzzle;
        }

        public int id_puzzles { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public int stage { get; set; }
        public int lock_solved { get; set; }
        public int completion_code { get; set; }
        public int game { get; set; }
        public int parent_puzzle { get; set; }
    }
}
