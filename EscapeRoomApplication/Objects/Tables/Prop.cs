﻿namespace EscapeRoomApplication.Objects.Tables
{
    public class PropNLocation
    {
        public PropNLocation(int id_props, string name, string description, int? parent_prop, int? access_puzzle, int game)
        {
            this.id_props = id_props;
            this.name = name;
            this.description = description;
            this.parent_prop = parent_prop;
            this.access_puzzle = access_puzzle;
            this.game = game;
        }

        public int id_props { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public int? parent_prop { get; set; }
        public int? access_puzzle { get; set; }
        public int game { get; set; }
    }
}
