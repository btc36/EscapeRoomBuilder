using EscapeRoomApplication.Objects.Tables;

namespace EscapeRoomApplication.Objects
{
    public class DAOResponseObject
    {
        public DAOResponseObject()
        {
            this.Clues = new List<Clue>();
            this.Games = new List<Game>();
            this.Items = new List<Item>();
            this.Locks = new List<Lock>();
            this.LockTypes = new List<LockType>();
            this.PropNLocations = new List<PropNLocation>();
            this.Puzzles = new List<Puzzle>();
            this.PuzzleItems = new List<PuzzleItem>();
            this.Stages = new List<Stage>();
            this.Users = new List<User>();
            this.success = true;
            this.gotStages = false;
            this.gotItems = false;
            this.gotLocks = false;
            this.gotLockTypes = false;
            this.gotProps = false;
            this.gotPuzzles = false;
            this.gotPuzzleItems = false;
            this.gotClues = false;
    }

        public List<Clue> Clues { get; set; }
        public List<Game> Games { get; set; }
        public List<Item> Items { get; set; }
        public List<Lock> Locks { get; set; }
        public List<LockType> LockTypes { get; set; }
        public List<PropNLocation> PropNLocations { get; set; }
        public List<Puzzle> Puzzles { get; set; }
        public List<PuzzleItem> PuzzleItems { get; set; }
        public List<Stage> Stages { get; set; }
        public List<User> Users { get; set; }
        public long insertedId { get; set; }
        public bool success { get; set; }
        public string message { get; set; }
        public bool gotStages { get; set; }
        public bool gotItems { get; set; }
        public bool gotLocks { get; set; }
        public bool gotLockTypes { get; set; }
        public bool gotProps { get; set; }
        public bool gotPuzzles { get; set; }
        public bool gotPuzzleItems { get; set; }
        public bool gotClues { get; set; }

    }
}
