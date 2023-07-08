namespace EscapeRoomApplication.Objects.Tables
{
    public class PuzzleItem
    {
        public PuzzleItem(int puzzle, int item)
        {
            this.item = item;
            this.puzzle = puzzle;
            this.id_puzzle_item = -1;
            this.game = 0;
            this.item_name = "N/A";
            this.puzzle_name = "N/A";
        }

        public PuzzleItem(int id_puzzle_item, int item, int puzzle, int game, string item_name, string puzzle_name)
        {
            this.id_puzzle_item = id_puzzle_item;
            this.item = item;
            this.puzzle = puzzle;
            this.game = game;
            this.item_name = item_name;
            this.puzzle_name = puzzle_name;
        }

        public int id_puzzle_item { get; set; }
        public int item { get; set; }
        public int puzzle { get; set; }
        public int game { get; set; }
        public string item_name { get; set; }
        public string puzzle_name { get; set; }
    }
}
