namespace EscapeRoomApplication.Objects.Tables
{
    public class Clue
    {
        public Clue(int id_clues, string clue_text, int puzzle)
        {
            this.id_clues = id_clues;
            this.clue_text = clue_text;
            this.puzzle = puzzle;
        }

        public int id_clues { get; set; }
        public string clue_text { get; set; }
        public int puzzle { get; set; }
    }
}
