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
            this.Props = new List<Prop>();
            this.Puzzles = new List<Puzzle>();
            this.PuzzleItems = new List<PuzzleItem>();
            this.Stages = new List<Stage>();
            this.Users = new List<User>();
        }

        public List<Clue> Clues { get; set; }
        public List<Game> Games { get; set; }
        public List<Item> Items { get; set; }
        public List<Lock> Locks { get; set; }
        public List<LockType> LockTypes { get; set; }
        public List<Prop> Props { get; set; }
        public List<Puzzle> Puzzles { get; set; }
        public List<PuzzleItem> PuzzleItems { get; set; }
        public List<Stage> Stages { get; set; }
        public List<User> Users { get; set; }

    }
}
