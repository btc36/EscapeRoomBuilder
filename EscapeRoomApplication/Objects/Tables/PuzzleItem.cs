namespace EscapeRoomApplication.Objects.Tables
{
    public class PuzzleItem
    {
        public PuzzleItem(int id_puzzle_item, int item, int puzzle)
        {
            this.id_puzzle_item = id_puzzle_item;
            this.item = item;
            this.puzzle = puzzle;
        }

        public int id_puzzle_item { get; set; }
        public int item { get; set; }
        public int puzzle { get; set; }
    }
}
