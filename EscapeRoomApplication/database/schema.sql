-- Escape Room Builder Database Schema
-- Run this script once to create the database and all tables.
-- Usage: mysql -u root -p < schema.sql

CREATE DATABASE IF NOT EXISTS escaperoomdb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE escaperoomdb;

-- -------------------------------------------------------
-- Core tables (no cross-dependencies)
-- -------------------------------------------------------

CREATE TABLE IF NOT EXISTS users (
    id_users  INT          NOT NULL AUTO_INCREMENT,
    username  VARCHAR(255) NOT NULL,
    PRIMARY KEY (id_users)
);

CREATE TABLE IF NOT EXISTS games (
    id_games    INT          NOT NULL AUTO_INCREMENT,
    user        INT          NOT NULL,
    name        VARCHAR(255) NOT NULL,
    description TEXT,
    PRIMARY KEY (id_games),
    FOREIGN KEY (user) REFERENCES users(id_users)
);

CREATE TABLE IF NOT EXISTS stages (
    id_stages   INT          NOT NULL AUTO_INCREMENT,
    game        INT          NOT NULL,
    name        VARCHAR(255) NOT NULL,
    description TEXT,
    stage_order INT          NOT NULL DEFAULT 1,
    PRIMARY KEY (id_stages),
    FOREIGN KEY (game) REFERENCES games(id_games)
);

CREATE TABLE IF NOT EXISTS lockTypes (
    id_lock_types INT          NOT NULL AUTO_INCREMENT,
    name          VARCHAR(255) NOT NULL,
    description   TEXT,
    PRIMARY KEY (id_lock_types)
);

-- -------------------------------------------------------
-- Tables with cross-dependencies (props ↔ puzzles ↔ locks)
-- Create without those FKs, add them after all tables exist.
-- -------------------------------------------------------

CREATE TABLE IF NOT EXISTS props (
    id_props      INT          NOT NULL AUTO_INCREMENT,
    game          INT          NOT NULL,
    parent_prop   INT          NULL,
    access_puzzle INT          NULL,     -- FK to puzzles added below
    name          VARCHAR(255) NOT NULL,
    description   TEXT,
    PRIMARY KEY (id_props),
    FOREIGN KEY (game)        REFERENCES games(id_games),
    FOREIGN KEY (parent_prop) REFERENCES props(id_props)
);

CREATE TABLE IF NOT EXISTS locks (
    id_locks    INT          NOT NULL AUTO_INCREMENT,
    game        INT          NOT NULL,
    lock_type   INT          NULL,
    location    INT          NULL,       -- FK to props
    name        VARCHAR(255) NOT NULL,
    description TEXT,
    combo       VARCHAR(255) NOT NULL DEFAULT '',
    PRIMARY KEY (id_locks),
    FOREIGN KEY (game)      REFERENCES games(id_games),
    FOREIGN KEY (lock_type) REFERENCES lockTypes(id_lock_types),
    FOREIGN KEY (location)  REFERENCES props(id_props)
);

CREATE TABLE IF NOT EXISTS puzzles (
    id_puzzles  INT          NOT NULL AUTO_INCREMENT,
    game        INT          NOT NULL,
    stage       INT          NULL,
    lock_solved INT          NULL,
    name        VARCHAR(255) NOT NULL,
    description TEXT,
    puzzle_code INT          NULL,
    PRIMARY KEY (id_puzzles),
    FOREIGN KEY (game)        REFERENCES games(id_games),
    FOREIGN KEY (stage)       REFERENCES stages(id_stages),
    FOREIGN KEY (lock_solved) REFERENCES locks(id_locks)
);

-- Now that puzzles exists, add the cross-reference FK on props
ALTER TABLE props
    ADD CONSTRAINT fk_props_access_puzzle
    FOREIGN KEY (access_puzzle) REFERENCES puzzles(id_puzzles);

CREATE TABLE IF NOT EXISTS items (
    id_items    INT          NOT NULL AUTO_INCREMENT,
    game        INT          NOT NULL,
    location    INT          NULL,
    name        VARCHAR(255) NOT NULL,
    description TEXT,
    PRIMARY KEY (id_items),
    FOREIGN KEY (game)     REFERENCES games(id_games),
    FOREIGN KEY (location) REFERENCES props(id_props)
);

CREATE TABLE IF NOT EXISTS puzzleitem (
    id_puzzle_item INT NOT NULL AUTO_INCREMENT,
    puzzle         INT NOT NULL,
    item           INT NOT NULL,
    game           INT NOT NULL,
    PRIMARY KEY (id_puzzle_item),
    FOREIGN KEY (puzzle) REFERENCES puzzles(id_puzzles),
    FOREIGN KEY (item)   REFERENCES items(id_items),
    FOREIGN KEY (game)   REFERENCES games(id_games)
);

CREATE TABLE IF NOT EXISTS clues (
    id_clues    INT  NOT NULL AUTO_INCREMENT,
    clue_puzzle INT  NOT NULL,
    clue_text   TEXT,
    PRIMARY KEY (id_clues),
    FOREIGN KEY (clue_puzzle) REFERENCES puzzles(id_puzzles)
);

-- -------------------------------------------------------
-- Default user (userId=1 is hardcoded in the React app)
-- -------------------------------------------------------
INSERT INTO users (id_users, username)
VALUES (1, 'Ben Cookson')
ON DUPLICATE KEY UPDATE username = username;
