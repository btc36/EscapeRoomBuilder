﻿using EscapeRoomApplication.Objects.Tables;

namespace EscapeRoomApplication.Objects
{
    public class DAOParametersObject
    {
        public int puzzleItemId { get; set; }
        public int itemId { get; set; }
        public int lockTypeId { get; set; }
        public int clueId { get; set; }
        public int lockId { get; set; }
        public int puzzleId { get; set; }
        public int userId { get; set; }
        public int propId { get; set; }
        public int gameId { get; set; }
        public int stageId { get; set; }
        public bool remove { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public int order { get; set; }
        public string combo { get; set; }
        public int parent { get; set; }
        public List<int> puzzleItems { get; set; }
        public PuzzleItem puzzleItem { get; set; }
    }
}
