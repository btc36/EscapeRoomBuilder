-- Captain's Treasure - Pirate Escape Room
-- Seed data based on the escape room design paper.
-- Run AFTER schema.sql: mysql -u root -p escaperoomdb < seed_game.sql

USE escaperoomdb;

-- -------------------------------------------------------
-- Game
-- -------------------------------------------------------
INSERT INTO games (user, name, description)
VALUES (1, 'Captain''s Treasure',
    'A pirate-themed escape room where players must navigate through the Captain''s Quarters to find and open the treasure chest.');

SET @game = LAST_INSERT_ID();

-- -------------------------------------------------------
-- Stages
-- -------------------------------------------------------
INSERT INTO stages (game, name, description, stage_order) VALUES
    (@game, 'Get Into the Captain''s Quarters',
     'Players must solve puzzles in the outer area to gain access to the Captain''s Quarters.', 1),
    (@game, 'Find the Treasure Chest',
     'Players explore the Captain''s Quarters to locate the treasure chest.', 2),
    (@game, 'Open the Big Chest',
     'Players must open the large treasure chest using clues found in the quarters.', 3),
    (@game, 'Open the Mini Chest',
     'Players open the final mini chest to retrieve the treasure.', 4);

SET @stage1 = (SELECT id_stages FROM stages WHERE game = @game AND stage_order = 1);
SET @stage2 = (SELECT id_stages FROM stages WHERE game = @game AND stage_order = 2);
SET @stage3 = (SELECT id_stages FROM stages WHERE game = @game AND stage_order = 3);
SET @stage4 = (SELECT id_stages FROM stages WHERE game = @game AND stage_order = 4);

-- -------------------------------------------------------
-- Lock Types
-- -------------------------------------------------------
INSERT INTO lockTypes (name, description) VALUES
    ('Combination Lock', 'A numeric padlock opened with a number combination.'),
    ('Word Lock', 'A padlock opened with a word combination.');

SET @combo_lock = (SELECT id_lock_types FROM lockTypes WHERE name = 'Combination Lock' LIMIT 1);
SET @word_lock  = (SELECT id_lock_types FROM lockTypes WHERE name = 'Word Lock'  LIMIT 1);

-- -------------------------------------------------------
-- Props (locations/containers) — without access_puzzle FK
-- -------------------------------------------------------
-- Top-level locations
INSERT INTO props (game, parent_prop, access_puzzle, name, description) VALUES
    (@game, NULL, NULL, 'Outer Area',          'The starting area outside the Captain''s Quarters.'),
    (@game, NULL, NULL, 'Captain''s Quarters', 'The main room unlocked after Stage 1.');

SET @outer_area   = (SELECT id_props FROM props WHERE game = @game AND name = 'Outer Area');
SET @captains_quarters = (SELECT id_props FROM props WHERE game = @game AND name = 'Captain''s Quarters');

-- Outer Area props
INSERT INTO props (game, parent_prop, access_puzzle, name, description) VALUES
    (@game, @outer_area, NULL, 'Cloth Chest',                   'A small chest sealed with a padlock.'),
    (@game, @outer_area, NULL, 'Fake Water Bottle',             'A decorative bottle with a combination lock on the cap.'),
    (@game, @outer_area, NULL, 'Puzzle Box',                    'A wooden puzzle box secured with a padlock.'),
    (@game, @outer_area, NULL, 'Captain''s Quarters Crawl Area','The crawl-space entrance to the Captain''s Quarters, locked with a padlock.');

SET @cloth_chest        = (SELECT id_props FROM props WHERE game = @game AND name = 'Cloth Chest');
SET @fake_water_bottle  = (SELECT id_props FROM props WHERE game = @game AND name = 'Fake Water Bottle');
SET @puzzle_box         = (SELECT id_props FROM props WHERE game = @game AND name = 'Puzzle Box');
SET @crawl_area         = (SELECT id_props FROM props WHERE game = @game AND name = 'Captain''s Quarters Crawl Area');

-- Captain's Quarters props
INSERT INTO props (game, parent_prop, access_puzzle, name, description) VALUES
    (@game, @captains_quarters, NULL, 'Big Chest',     'A large treasure chest requiring two locks to open.'),
    (@game, @captains_quarters, NULL, 'Mini Chest',    'A small chest inside the Big Chest, locked with a word lock.'),
    (@game, @captains_quarters, NULL, 'Map Wall',      'A wall display featuring the magnetic map puzzle.'),
    (@game, @captains_quarters, NULL, 'Globe Pedestal','A pedestal holding the captain''s globe.');

SET @big_chest     = (SELECT id_props FROM props WHERE game = @game AND name = 'Big Chest');
SET @mini_chest    = (SELECT id_props FROM props WHERE game = @game AND name = 'Mini Chest');
SET @map_wall      = (SELECT id_props FROM props WHERE game = @game AND name = 'Map Wall');
SET @globe_pedestal= (SELECT id_props FROM props WHERE game = @game AND name = 'Globe Pedestal');

-- Sub-props inside Cloth Chest (revealed after opening it)
INSERT INTO props (game, parent_prop, access_puzzle, name, description) VALUES
    (@game, @cloth_chest, NULL, 'Clock Display',        'A clock mounted inside the cloth chest used for the Clock puzzle.'),
    (@game, @cloth_chest, NULL, 'Picture Frame Display','A set of picture frames inside the cloth chest used for the Picture Frames puzzle.');

SET @clock_display  = (SELECT id_props FROM props WHERE game = @game AND name = 'Clock Display');
SET @picture_frames = (SELECT id_props FROM props WHERE game = @game AND name = 'Picture Frame Display');

-- Sub-props inside Puzzle Box
INSERT INTO props (game, parent_prop, access_puzzle, name, description) VALUES
    (@game, @puzzle_box, NULL, 'Liars Dice Board',     'The Liars Dice game board inside the puzzle box.'),
    (@game, @puzzle_box, NULL, 'Battleship Board',     'The Battleship game board inside the puzzle box.');

SET @liars_dice_board  = (SELECT id_props FROM props WHERE game = @game AND name = 'Liars Dice Board');
SET @battleship_board  = (SELECT id_props FROM props WHERE game = @game AND name = 'Battleship Board');

-- -------------------------------------------------------
-- Locks
-- -------------------------------------------------------
INSERT INTO locks (game, lock_type, location, name, description, combo) VALUES
    (@game, @combo_lock, @cloth_chest,   'Cloth Chest Padlock',             'Padlock sealing the Cloth Chest.',                      '750'),
    (@game, @combo_lock, @fake_water_bottle, 'Fake Water Bottle Lock',      'Combination lock on the Fake Water Bottle.',             '2436'),
    (@game, @combo_lock, @puzzle_box,    'Puzzle Box Lock',                 'Padlock sealing the Puzzle Box.',                        '7391'),
    (@game, @combo_lock, @crawl_area,    'Crawl Area Padlock',              'Padlock blocking the crawl-space into the quarters.',    '4175'),
    (@game, @combo_lock, @captains_quarters, 'Captain''s Quarters Door Lock','Combination lock on the Captain''s Quarters door.',    '3216'),
    (@game, @combo_lock, @big_chest,     'Big Chest Lock 1',                'First combination lock on the Big Chest.',               '1880'),
    (@game, @combo_lock, @big_chest,     'Big Chest Lock 2',                'Second combination lock on the Big Chest.',              '1540'),
    (@game, @word_lock,  @mini_chest,    'Mini Chest Word Lock',            'Word lock on the Mini Chest.',                          'PIRATE');

SET @lock_cloth_chest     = (SELECT id_locks FROM locks WHERE game = @game AND name = 'Cloth Chest Padlock');
SET @lock_water_bottle    = (SELECT id_locks FROM locks WHERE game = @game AND name = 'Fake Water Bottle Lock');
SET @lock_puzzle_box      = (SELECT id_locks FROM locks WHERE game = @game AND name = 'Puzzle Box Lock');
SET @lock_crawl           = (SELECT id_locks FROM locks WHERE game = @game AND name = 'Crawl Area Padlock');
SET @lock_door            = (SELECT id_locks FROM locks WHERE game = @game AND name = 'Captain''s Quarters Door Lock');
SET @lock_big_chest_1     = (SELECT id_locks FROM locks WHERE game = @game AND name = 'Big Chest Lock 1');
SET @lock_big_chest_2     = (SELECT id_locks FROM locks WHERE game = @game AND name = 'Big Chest Lock 2');
SET @lock_mini_chest      = (SELECT id_locks FROM locks WHERE game = @game AND name = 'Mini Chest Word Lock');

-- -------------------------------------------------------
-- Puzzles
-- -------------------------------------------------------
INSERT INTO puzzles (game, stage, lock_solved, name, description, puzzle_code) VALUES
    (@game, @stage1, @lock_cloth_chest,  'The Clock',
     'Players read a clock display and interpret the time to derive a 3-digit combination.',
     10001),
    (@game, @stage1, @lock_water_bottle, 'Picture Frames',
     'Players examine picture frames, each containing a clue image that maps to a digit.',
     10002),
    (@game, @stage1, @lock_puzzle_box,   'Reading Time',
     'Players use a set of books or reading materials to decode a 4-digit code.',
     10003),
    (@game, @stage1, @lock_crawl,        'Liars Dice',
     'Players play a round of Liars Dice; the result encodes the combination.',
     10004),
    (@game, @stage1, @lock_door,         'Battleship',
     'Players use a Battleship grid to decode coordinates that form the combination.',
     10005),
    (@game, @stage2, @lock_big_chest_1,  'Magnetic Map',
     'Players arrange magnetic pieces on a map to reveal a 4-digit code.',
     10006),
    (@game, @stage3, @lock_big_chest_2,  'The Globe',
     'Players rotate and inspect the globe to find coordinates that form the combination.',
     10007),
    (@game, @stage4, @lock_mini_chest,   'Codex',
     'Players use a cipher codex to translate symbols into the word combination.',
     10008);

SET @puzzle_clock     = (SELECT id_puzzles FROM puzzles WHERE game = @game AND name = 'The Clock');
SET @puzzle_frames    = (SELECT id_puzzles FROM puzzles WHERE game = @game AND name = 'Picture Frames');
SET @puzzle_reading   = (SELECT id_puzzles FROM puzzles WHERE game = @game AND name = 'Reading Time');
SET @puzzle_dice      = (SELECT id_puzzles FROM puzzles WHERE game = @game AND name = 'Liars Dice');
SET @puzzle_battle    = (SELECT id_puzzles FROM puzzles WHERE game = @game AND name = 'Battleship');
SET @puzzle_map       = (SELECT id_puzzles FROM puzzles WHERE game = @game AND name = 'Magnetic Map');
SET @puzzle_globe     = (SELECT id_puzzles FROM puzzles WHERE game = @game AND name = 'The Globe');
SET @puzzle_codex     = (SELECT id_puzzles FROM puzzles WHERE game = @game AND name = 'Codex');

-- -------------------------------------------------------
-- Link access_puzzle back onto props (circular FK resolved)
-- -------------------------------------------------------
UPDATE props SET access_puzzle = @puzzle_clock   WHERE id_props = @clock_display;
UPDATE props SET access_puzzle = @puzzle_frames  WHERE id_props = @picture_frames;
UPDATE props SET access_puzzle = @puzzle_dice    WHERE id_props = @liars_dice_board;
UPDATE props SET access_puzzle = @puzzle_battle  WHERE id_props = @battleship_board;
UPDATE props SET access_puzzle = @puzzle_map     WHERE id_props = @map_wall;
UPDATE props SET access_puzzle = @puzzle_globe   WHERE id_props = @globe_pedestal;

-- -------------------------------------------------------
-- Items
-- -------------------------------------------------------
-- Outer Area items
INSERT INTO items (game, location, name, description) VALUES
    (@game, @outer_area, 'Pirate Hat',          'A weathered tricorn hat hanging near the entrance.'),
    (@game, @outer_area, 'Treasure Map',        'A torn, aged map with partial coordinates.'),
    (@game, @outer_area, 'Compass',             'An old brass compass pointing to a clue.'),
    (@game, @outer_area, 'Rope Coil',           'A coil of rope with knots that encode numbers.'),
    (@game, @outer_area, 'Lantern',             'A dim lantern hiding a clue underneath.'),
    (@game, @outer_area, 'Anchor Symbol Card',  'A card printed with an anchor symbol and partial code.');

-- Cloth Chest items (revealed after opening)
INSERT INTO items (game, location, name, description) VALUES
    (@game, @cloth_chest, 'Clock Hand Key',     'A decorative key shaped like a clock hand.'),
    (@game, @cloth_chest, 'Roman Numeral Sheet','A reference sheet mapping Roman numerals to digits.'),
    (@game, @cloth_chest, 'Frame Key 1',        'A small ornate key found behind the first picture frame.'),
    (@game, @cloth_chest, 'Frame Key 2',        'A small ornate key found behind the second picture frame.'),
    (@game, @cloth_chest, 'Frame Key 3',        'A small ornate key found behind the third picture frame.');

-- Fake Water Bottle items
INSERT INTO items (game, location, name, description) VALUES
    (@game, @fake_water_bottle, 'Rolled Scroll', 'A scroll inside the bottle containing cipher text.');

-- Puzzle Box items (revealed after opening)
INSERT INTO items (game, location, name, description) VALUES
    (@game, @puzzle_box, 'Dice Set',            'Special dice used in the Liars Dice puzzle.'),
    (@game, @puzzle_box, 'Battleship Grid',     'A printed Battleship grid with hidden ship positions.'),
    (@game, @puzzle_box, 'Coordinate Decoder', 'A decoder card for translating grid positions to digits.');

-- Captain's Quarters items
INSERT INTO items (game, location, name, description) VALUES
    (@game, @captains_quarters, 'Captain''s Log',    'The captain''s journal with encoded entries.'),
    (@game, @captains_quarters, 'Sextant',            'A navigational sextant with degree markings.'),
    (@game, @captains_quarters, 'Magnetic Tokens',    'Magnetic pieces used in the Map puzzle.'),
    (@game, @captains_quarters, 'Globe Cipher Ring',  'A ring that slides onto the globe to reveal a code.'),
    (@game, @captains_quarters, 'Codex Tablet',       'A stone tablet engraved with the pirate cipher alphabet.'),
    (@game, @captains_quarters, 'Symbol Cards',       'Cards printed with symbols that correspond to letters via the codex.'),
    (@game, @captains_quarters, 'Doubloon',           'A gold coin — the final treasure inside the Mini Chest.');

-- -------------------------------------------------------
-- Puzzle-Item relationships (many-to-many)
-- -------------------------------------------------------
SET @item_clock_hand   = (SELECT id_items FROM items WHERE game = @game AND name = 'Clock Hand Key');
SET @item_roman        = (SELECT id_items FROM items WHERE game = @game AND name = 'Roman Numeral Sheet');
SET @item_frame1       = (SELECT id_items FROM items WHERE game = @game AND name = 'Frame Key 1');
SET @item_frame2       = (SELECT id_items FROM items WHERE game = @game AND name = 'Frame Key 2');
SET @item_frame3       = (SELECT id_items FROM items WHERE game = @game AND name = 'Frame Key 3');
SET @item_scroll       = (SELECT id_items FROM items WHERE game = @game AND name = 'Rolled Scroll');
SET @item_dice         = (SELECT id_items FROM items WHERE game = @game AND name = 'Dice Set');
SET @item_bg_grid      = (SELECT id_items FROM items WHERE game = @game AND name = 'Battleship Grid');
SET @item_decoder      = (SELECT id_items FROM items WHERE game = @game AND name = 'Coordinate Decoder');
SET @item_log          = (SELECT id_items FROM items WHERE game = @game AND name = 'Captain''s Log');
SET @item_tokens       = (SELECT id_items FROM items WHERE game = @game AND name = 'Magnetic Tokens');
SET @item_globe_ring   = (SELECT id_items FROM items WHERE game = @game AND name = 'Globe Cipher Ring');
SET @item_codex        = (SELECT id_items FROM items WHERE game = @game AND name = 'Codex Tablet');
SET @item_symbols      = (SELECT id_items FROM items WHERE game = @game AND name = 'Symbol Cards');
SET @item_map          = (SELECT id_items FROM items WHERE game = @game AND name = 'Treasure Map');

INSERT INTO puzzleitem (puzzle, item, game) VALUES
    -- The Clock uses the clock hand key and roman numeral sheet
    (@puzzle_clock,  @item_clock_hand, @game),
    (@puzzle_clock,  @item_roman,      @game),
    -- Picture Frames use the three frame keys
    (@puzzle_frames, @item_frame1,     @game),
    (@puzzle_frames, @item_frame2,     @game),
    (@puzzle_frames, @item_frame3,     @game),
    -- Reading Time uses the rolled scroll from the water bottle
    (@puzzle_reading, @item_scroll,    @game),
    (@puzzle_reading, @item_log,       @game),
    -- Liars Dice uses the dice set
    (@puzzle_dice,   @item_dice,       @game),
    -- Battleship uses the grid and decoder
    (@puzzle_battle, @item_bg_grid,    @game),
    (@puzzle_battle, @item_decoder,    @game),
    -- Magnetic Map uses the tokens and treasure map
    (@puzzle_map,    @item_tokens,     @game),
    (@puzzle_map,    @item_map,        @game),
    -- The Globe uses the cipher ring
    (@puzzle_globe,  @item_globe_ring, @game),
    -- Codex uses the tablet and symbol cards
    (@puzzle_codex,  @item_codex,      @game),
    (@puzzle_codex,  @item_symbols,    @game);

-- -------------------------------------------------------
-- Clues
-- -------------------------------------------------------
INSERT INTO clues (clue_puzzle, clue_text) VALUES
    -- The Clock
    (@puzzle_clock, 'Look at where the minute hand points — that digit comes first.'),
    (@puzzle_clock, 'The hour is your last digit. Roman numerals may help.'),
    (@puzzle_clock, 'What time is it when the captain sets sail? 7:50 — read carefully.'),

    -- Picture Frames
    (@puzzle_frames, 'Each frame holds a symbol. Match each symbol to a number using the key on the back.'),
    (@puzzle_frames, 'Order the frames left to right; the digits follow the same order.'),

    -- Reading Time
    (@puzzle_reading, 'Find the four highlighted words in the captain''s log. Their page numbers are your code.'),
    (@puzzle_reading, 'The scroll inside the bottle tells you which words to look for.'),

    -- Liars Dice
    (@puzzle_dice, 'Roll the special dice and record the result — the captain never lies about four numbers.'),
    (@puzzle_dice, 'The sum of each pair of dice gives you one digit.'),

    -- Battleship
    (@puzzle_battle, 'Each ship''s position maps to a digit using the coordinate decoder.'),
    (@puzzle_battle, 'Sink all four ships to reveal the combination.'),

    -- Magnetic Map
    (@puzzle_map, 'Arrange the magnetic tokens on the map to mark the X locations.'),
    (@puzzle_map, 'Read the numbers under each X from north to south.'),

    -- The Globe
    (@puzzle_globe, 'Slide the cipher ring onto the globe and align it with the red meridian.'),
    (@puzzle_globe, 'The four marked latitude lines each correspond to a digit.'),

    -- Codex
    (@puzzle_codex, 'Use the codex tablet to translate each symbol card into a letter.'),
    (@puzzle_codex, 'The word spells out what every pirate loves most.');
