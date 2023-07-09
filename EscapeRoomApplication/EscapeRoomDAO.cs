using EscapeRoomApplication.Objects.Tables;
using EscapeRoomApplication.Objects;
using MySqlConnector;

namespace EscapeRoomApplication
{
    public class EscapeRoomDAO
    {


        Dictionary<string, Func<MySqlConnection, DAOParametersObject, DAOResponseObject, DAOResponseObject>> EscapeRoomDAOFunctions;
        public EscapeRoomDAO()
        {
            EscapeRoomDAOFunctions = new Dictionary<string, Func<MySqlConnection,DAOParametersObject, DAOResponseObject, DAOResponseObject>>();
            EscapeRoomDAOFunctions["getUsers"] = this.getUsers;
            EscapeRoomDAOFunctions["getGames"] = this.getGames;
            EscapeRoomDAOFunctions["addGame"] = this.addGame;
            EscapeRoomDAOFunctions["getStages"] = this.getStages;
            EscapeRoomDAOFunctions["addStage"] = this.addStage;
            EscapeRoomDAOFunctions["updateStage"] = this.updateStage;
            EscapeRoomDAOFunctions["getPuzzles"] = this.getPuzzles;
            EscapeRoomDAOFunctions["addPuzzle"] = this.addPuzzle;
            EscapeRoomDAOFunctions["updatePuzzle"] = this.updatePuzzle;
            EscapeRoomDAOFunctions["getLocks"] = this.getLocks;
            EscapeRoomDAOFunctions["addLock"] = this.addLock;
            EscapeRoomDAOFunctions["updateLock"] = this.updateLock;
            EscapeRoomDAOFunctions["getLockTypes"] = this.getLockTypes;
            EscapeRoomDAOFunctions["addLockType"] = this.addLockType;
            EscapeRoomDAOFunctions["updateLockType"] = this.updateLockType;
            EscapeRoomDAOFunctions["getPropNLocations"] = this.getPropNLocations;
            EscapeRoomDAOFunctions["addPropNLocation"] = this.addPropNLocation;
            EscapeRoomDAOFunctions["updatePropNLocation"] = this.updatePropNLocation;
            EscapeRoomDAOFunctions["getItems"] = this.getItems;
            EscapeRoomDAOFunctions["addItem"] = this.addItem;
            EscapeRoomDAOFunctions["updateItem"] = this.updateItem;
            EscapeRoomDAOFunctions["getPuzzleItems"] = this.getPuzzleItems;
            EscapeRoomDAOFunctions["getClues"] = this.getClues;
            EscapeRoomDAOFunctions["addClue"] = this.addClue;
            EscapeRoomDAOFunctions["updateClue"] = this.updateClue;
        }
        public MySqlConnection getConnection()
        {
            string connectionString = "server=127.0.0.1;port=3306;database=escaperoomdb;uid=root;password=cooksben001";
            MySqlConnection connection = new MySqlConnection(connectionString);
            return connection;
        }

        public DAOResponseObject MakeDatabaseCall(string methodName, DAOParametersObject parameters)
        {
            MySqlConnection connection = getConnection();
            DAOResponseObject myResponse = new DAOResponseObject();
            try
            {
                connection.Open();
                // Connection opened successfully. You can perform database operations here.
                myResponse = EscapeRoomDAOFunctions[methodName](connection,parameters, myResponse);
            }
            catch (Exception ex)
            {
                // Handle connection error
                Console.WriteLine("Error: " + ex.Message);
                myResponse.success = false;
                myResponse.message = ex.Message;
            }
            finally
            {
                connection.Close();
                // Ensure the connection is properly closed.
            }
            return myResponse;
        }

        //Eventually add password for logging in and creating new users
        //I will start with an default user
        public DAOResponseObject getUsers(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            string sqlQuery = "SELECT * FROM users";
            using (MySqlCommand command = new MySqlCommand(sqlQuery, connection))
            {
                // Execute the query and obtain a MySqlDataReader
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    // Loop through the rows returned by the query
                    while (reader.Read())
                    {
                        // Access columns by name or index
                        int userId = reader.GetInt16("id_users");
                        string userName = reader.GetString("username");
                        User user = new User(userId,userName);
                        myResponse.Users.Add(user);
                    }
                }
            }
            return myResponse;
        }

        //GAME FUNCTIONS
        public DAOResponseObject getGames(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            myResponse.Games.Clear();
            string sqlQuery = "SELECT * FROM games";
            using (MySqlCommand command = new MySqlCommand(sqlQuery, connection))
            {
                // Execute the query and obtain a MySqlDataReader
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    // Loop through the rows returned by the query
                    while (reader.Read())
                    {
                        // Access columns by name or index
                        int gameId = reader.GetInt16("id_games");
                        string name = reader.GetString("name");
                        int userId = reader.GetInt16("user");
                        string description = reader.GetString("description");
                        Game game = new Game(gameId, name, description, userId);
                        myResponse.Games.Add(game);
                    }
                }
            }
            return myResponse;
        }
        public void removeGameReferences(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            

        }
        public DAOResponseObject updateGame(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            //DO I DO VALIDATION BEFORE, OR BY TABLE DEFINITIONS
            if (parameters.remove)
            {
                removeGameReferences(connection, parameters, myResponse);
            }
            else
            {

            }
            string sqlQuery = "UPDATE games WHERE userId = @value1";
            using (MySqlCommand command = new MySqlCommand(sqlQuery, connection))
            {
                // Execute the query and obtain a MySqlDataReader
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    // Loop through the rows returned by the query
                    while (reader.Read())
                    {

                    }
                }
            }
            return myResponse;
        }

        public DAOResponseObject addGame(MySqlConnection connection,DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            using (connection)
            {
                // Create a SQL query for the insert statement
                string sqlQuery = "INSERT INTO games (user, name, description) VALUES (@value1, @value2, @value3)";

                // Create a MySqlCommand object with the SQL query and connection
                using (MySqlCommand command = new MySqlCommand(sqlQuery, connection))
                {
                    // Add parameters for the values to be inserted
                    command.Parameters.AddWithValue("@value1", parameters.userId);
                    command.Parameters.AddWithValue("@value2", parameters.name);
                    command.Parameters.AddWithValue("@value3", parameters.description);
                    command.ExecuteNonQuery();
                    // Execute the insert command

                    long lastInsertedId = command.LastInsertedId;
                    if(lastInsertedId == null)
                    {
                        myResponse.success = false;
                        myResponse.message = "Failure to insert into the table";
                    }
                    else
                    {
                        myResponse.insertedId = lastInsertedId;
                    }

                }
            }
            return myResponse;
        }
       
        //STAGES FUNCTIONS
        public DAOResponseObject getStages(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            myResponse.Stages.Clear();
            string sqlQuery = "SELECT * FROM stages WHERE game = @value1";
            using (MySqlCommand command = new MySqlCommand(sqlQuery, connection))
            {
                command.Parameters.AddWithValue("@value1", parameters.gameId);
                // Execute the query and obtain a MySqlDataReader
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    // Loop through the rows returned by the query
                    while (reader.Read())
                    {
                        // Access columns by name or index
                        int stageId = reader.GetInt32("id_stages");
                        string name = reader.GetString("name");
                        string description = reader.GetString("description");
                        int order = reader.GetInt32("stage_order");
                        int gameId = reader.GetInt32("game");
                        Stage stage = new Stage(stageId,name,description,order,gameId);
                        myResponse.Stages.Add(stage);
                    }
                }
            }
            myResponse.gotStages = true;
            return myResponse;
        }
        //addStage
        public DAOResponseObject addStage(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            using (connection)
            {
                // Create a SQL query for the insert statement
                string sqlQuery = "INSERT INTO stages (name,description, stage_order, game) VALUES (@value1, @value2, @value3, @value4)";

                // Create a MySqlCommand object with the SQL query and connection
                using (MySqlCommand command = new MySqlCommand(sqlQuery, connection))
                {
                    // Add parameters for the values to be inserted
                    command.Parameters.AddWithValue("@value1", parameters.name);
                    command.Parameters.AddWithValue("@value2", parameters.description);
                    command.Parameters.AddWithValue("@value3",1);
                    command.Parameters.AddWithValue("@value4", parameters.gameId);
                    command.ExecuteNonQuery();
                    // Execute the insert command

                    long lastInsertedId = command.LastInsertedId;
                    if (lastInsertedId == null)
                    {
                        myResponse.success = false;
                        myResponse.message = "Failure to insert into the table";
                    }
                    else
                    {
                        myResponse = getStages(connection, parameters, myResponse);
                    }

                }
            }
            return myResponse;
        }

        public void removeStageReferences(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            var sqlQuery = "UPDATE puzzles SET stage = NULL WHERE stage = @value1";
            using (MySqlCommand command = new MySqlCommand(sqlQuery, connection))
            {
                command.Parameters.AddWithValue("@value1", parameters.stageId);
                command.ExecuteNonQuery();
            }
        }

        //updateStage
        public DAOResponseObject updateStage(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            string sqlQuery = "";
            //DO I DO VALIDATION BEFORE, OR BY TABLE DEFINITIONS
            if (parameters.remove)
            {
                removeStageReferences(connection,parameters,myResponse);
               sqlQuery = "DELETE from stages WHERE id_stages = @value1";
            }
            else
            {
                sqlQuery = "UPDATE stages SET name = @value2, stage_order = @value3, description = @value4 WHERE id_stages = @value1";

            }
            
            using (MySqlCommand command = new MySqlCommand(sqlQuery, connection))
            {
                command.Parameters.AddWithValue("@value1", parameters.stageId);
                if (!parameters.remove)
                {
                    command.Parameters.AddWithValue("@value2", parameters.name);
                    command.Parameters.AddWithValue("@value3", 1);//Lets worry about order later
                    command.Parameters.AddWithValue("@value4", parameters.description);
                }
                try
                {
                    command.ExecuteNonQuery();
                    myResponse = getStages(connection,parameters,myResponse);
                }
                catch(Exception ex)
                {
                    myResponse.success = false;
                    myResponse.message = "Failure to insert into the table-" + ex.Message;
                }
                long lastInsertedId = command.LastInsertedId;
            }
            return myResponse;
        }

        //PUZZLE FUNCTIONS
        public DAOResponseObject getPuzzles(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            myResponse.Puzzles.Clear();
            if (!myResponse.gotStages)
            {
                myResponse = getStages(connection, parameters, myResponse);
            }
            var stages = myResponse.Stages;
            var stageIds = new List<long>();
            for(var i = 0; i < stages.Count; i++)
            {
                var stage = stages[i];
                stageIds.Add(stage.id_stages);
            }
            var stageIdList = String.Join(",", stageIds);
            string sqlQuery = "SELECT * FROM puzzles WHERE stage IN (" + stageIdList + ")";
            using (MySqlCommand command = new MySqlCommand(sqlQuery, connection))
            {
                // Execute the query and obtain a MySqlDataReader
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    // Loop through the rows returned by the query
                    while (reader.Read())
                    {
                        // Access columns by name or index
                        int puzzleId = reader.GetInt32("id_puzzles");
                        string name = reader.GetString("name");
                        string description = reader.GetString("description");
                        int stageId = reader.GetInt32("stage");
                        int lockId = -1;
                        int lock_index = reader.GetOrdinal("lock_solved");
                        if (!reader.IsDBNull(lock_index))
                        {
                            lockId = reader.GetInt32("lock_solved");
                        }
                        Puzzle puzzle = new Puzzle(puzzleId,name,description, stageId, lockId);
                        myResponse.Puzzles.Add(puzzle);
                    }
                }
                myResponse.gotPuzzles = true;
                if (!myResponse.gotLocks)
                {
                    myResponse = getLocks(connection, parameters, myResponse);
                    myResponse.gotLocks = true;
                }
                if (!myResponse.gotItems)
                {
                    myResponse = getItems(connection, parameters, myResponse);
                    myResponse.gotItems = true;
                }
                if (!myResponse.gotPuzzleItems)
                {
                    myResponse = getPuzzleItems(connection, parameters, myResponse);
                    myResponse.gotPuzzleItems = true;
                }
            }
            return myResponse;
        }
        public DAOResponseObject addPuzzle(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            using (connection)
            {
                // Create a SQL query for the insert statement
                string sqlQuery = "INSERT INTO puzzles (name, description, stage, lock_solved) VALUES (@value1, @value2, @value3, @value4)";

                // Create a MySqlCommand object with the SQL query and connection
                using (MySqlCommand command = new MySqlCommand(sqlQuery, connection))
                {
                    // Add parameters for the values to be inserted
                    command.Parameters.AddWithValue("@value1", parameters.name);
                    command.Parameters.AddWithValue("@value2", parameters.description);
                    command.Parameters.AddWithValue("@value3", parameters.stageId);
                    command.Parameters.AddWithValue("@value4", parameters.lockId);
                    command.ExecuteNonQuery();
                    // Execute the insert command

                    long lastInsertedId = command.LastInsertedId;
                    if (lastInsertedId == null)
                    {
                        myResponse.success = false;
                        myResponse.message = "Failure to insert into the table";
                    }
                    else
                    {
                        myResponse.insertedId = lastInsertedId;
                        parameters.puzzleId = Convert.ToInt32(lastInsertedId);
                        myResponse = updatePuzzleItems(connection, parameters, myResponse);
                        myResponse = getPuzzles(connection, parameters, myResponse);
                    }

                }
            }
            return myResponse;
        }

        public void removePuzzleReferences(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            var sqlQuery = "UPDATE props SET access_puzzle = NULL WHERE access_puzzle = @value1";
            using (MySqlCommand command = new MySqlCommand(sqlQuery, connection))
            {
                command.Parameters.AddWithValue("@value1", parameters.puzzleId);
                command.ExecuteNonQuery();
            }
            sqlQuery = "DELETE FROM puzzleitem WHERE puzzle = @value1";
            using (MySqlCommand command = new MySqlCommand(sqlQuery, connection))
            {
                command.Parameters.AddWithValue("@value1", parameters.puzzleId);
                command.ExecuteNonQuery();
            }
            sqlQuery = "DELETE FROM clues WHERE clue_puzzle = @value1";
            using (MySqlCommand command = new MySqlCommand(sqlQuery, connection))
            {
                command.Parameters.AddWithValue("@value1", parameters.puzzleId);
                command.ExecuteNonQuery();
            }
        }
        public DAOResponseObject updatePuzzle(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            string sqlQuery = "";
            //DO I DO VALIDATION BEFORE, OR BY TABLE DEFINITIONS
            if (parameters.remove)
            {
                removePuzzleReferences(connection, parameters, myResponse);
                sqlQuery = "DELETE from puzzles WHERE id_puzzles = @value1";
            }
            else
            {
                sqlQuery = "UPDATE puzzles " +
                    "SET name=@value2,description=@value3,stage=@value4,lock_solved=@value5 " +
                    "WHERE id_puzzles = @value1";

            }

            using (MySqlCommand command = new MySqlCommand(sqlQuery, connection))
            {
                command.Parameters.AddWithValue("@value1", parameters.puzzleId);
                if (!parameters.remove)
                {
                    command.Parameters.AddWithValue("@value2", parameters.name);
                    command.Parameters.AddWithValue("@value3", parameters.description);
                    command.Parameters.AddWithValue("@value4", parameters.stageId);
                    command.Parameters.AddWithValue("@value5", parameters.lockId);
                }
                try
                {
                    command.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    myResponse.success = false;
                    myResponse.message = "Failure to insert into the table-" + ex.Message;
                }
            }
            myResponse = updatePuzzleItems(connection, parameters, myResponse);
            myResponse = getPuzzles(connection, parameters, myResponse);
            return myResponse;
        }

        //Lock FUNCTIONS
        public DAOResponseObject getLocks(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            myResponse.Locks.Clear();
            string sqlQuery = "SELECT * FROM locks WHERE game = @value1";
            using (MySqlCommand command = new MySqlCommand(sqlQuery, connection))
            {

                command.Parameters.AddWithValue("@value1", parameters.gameId);
                // Execute the query and obtain a MySqlDataReader
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    // Loop through the rows returned by the query
                    while (reader.Read())
                    {
                        // Access columns by name or index
                        int lockId = reader.GetInt32("id_locks");
                        string name = reader.GetString("name");
                        string description = reader.GetString("description");
                        string combo = reader.GetString("combo");
                        int lock_type = -1;
                        int lock_type_index = reader.GetOrdinal("lock_type");
                        if (!reader.IsDBNull(lock_type_index))
                        {
                            lock_type = reader.GetInt32("lock_type");
                        }
                        int game = reader.GetInt32("game");
                        Lock myLock = new Lock(lockId,combo,lock_type,description,name,game);
                        myResponse.Locks.Add(myLock);
                    }
                }
            }
            myResponse.gotLocks = true;
            if (!myResponse.gotLockTypes)
            {
                myResponse = getLockTypes(connection, parameters, myResponse);
                myResponse.gotLockTypes = true;
            }
            return myResponse;
        }
        //addStage
        public DAOResponseObject addLock(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            using (connection)
            {
                // Create a SQL query for the insert statement
                string sqlQuery = "INSERT INTO locks (name, description, lock_type, game, combo) VALUES (@value1, @value2, @value3, @value4, @value5)";

                // Create a MySqlCommand object with the SQL query and connection
                using (MySqlCommand command = new MySqlCommand(sqlQuery, connection))
                {
                    // Add parameters for the values to be inserted
                    command.Parameters.AddWithValue("@value1", parameters.name);
                    command.Parameters.AddWithValue("@value2", parameters.description);
                    command.Parameters.AddWithValue("@value3", parameters.lockTypeId);
                    command.Parameters.AddWithValue("@value4", parameters.gameId);
                    command.Parameters.AddWithValue("@value5", parameters.combo);
                    command.ExecuteNonQuery();
                    // Execute the insert command

                    long lastInsertedId = command.LastInsertedId;
                    if (lastInsertedId == null)
                    {
                        myResponse.success = false;
                        myResponse.message = "Failure to insert into the table";
                    }
                    else
                    {
                        myResponse.insertedId = lastInsertedId;
                        myResponse = getLocks(connection, parameters, myResponse);
                    }

                }
            }
            return myResponse;
        }

        public void removeLockReferences(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            var sqlQuery = "UPDATE puzzles SET lock_solved = NULL WHERE lock_solved = @value1";
            using (MySqlCommand command = new MySqlCommand(sqlQuery, connection))
            {
                command.Parameters.AddWithValue("@value1", parameters.lockId);
                command.ExecuteNonQuery();
            }
        }
        public DAOResponseObject updateLock(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            string sqlQuery = "";
            //DO I DO VALIDATION BEFORE, OR BY TABLE DEFINITIONS
            if (parameters.remove)
            {
                removeLockReferences(connection, parameters, myResponse);
                sqlQuery = "DELETE from locks WHERE id_locks = @value1";
            }
            else
            {
                sqlQuery = "UPDATE locks " +
                    "SET name=@value2,description=@value3,lock_type=@value4,game=@value5,combo=@value6 " +
                    "WHERE id_locks = @value1";
            }

            using (MySqlCommand command = new MySqlCommand(sqlQuery, connection))
            {
                command.Parameters.AddWithValue("@value1", parameters.lockId);
                if (!parameters.remove)
                {
                    command.Parameters.AddWithValue("@value2", parameters.name);
                    command.Parameters.AddWithValue("@value3", parameters.description);
                    command.Parameters.AddWithValue("@value4", parameters.lockTypeId);
                    command.Parameters.AddWithValue("@value5", parameters.gameId);
                    command.Parameters.AddWithValue("@value6", parameters.combo);
                }
                try
                {
                    command.ExecuteNonQuery();
                    myResponse = getLocks(connection, parameters, myResponse);
                }
                catch (Exception ex)
                {
                    myResponse.success = false;
                    myResponse.message = "Failure to insert into the table-" + ex.Message;
                }
            }
            return myResponse;
        }

        //Lock Type FUNCTIONS
        public DAOResponseObject getLockTypes(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            myResponse.LockTypes.Clear();
            string sqlQuery = "SELECT * FROM lockTypes";
            using (MySqlCommand command = new MySqlCommand(sqlQuery, connection))
            {
                // Execute the query and obtain a MySqlDataReader
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    command.Parameters.AddWithValue("@value1", parameters.lockTypeId);
                    // Loop through the rows returned by the query
                    while (reader.Read())
                    {
                        // Access columns by name or index
                        int lockTypeId = reader.GetInt32("id_lock_types");
                        string name = reader.GetString("name");
                        string description = reader.GetString("description");
                        LockType lockType = new LockType(lockTypeId,name,description);
                        myResponse.LockTypes.Add(lockType);
                    }
                }
            }
            myResponse.gotLockTypes = true;
            return myResponse;
        }
        //addStage
        public DAOResponseObject addLockType(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            using (connection)
            {
                // Create a SQL query for the insert statement
                string sqlQuery = "INSERT INTO lockTypes (name, description) VALUES (@value1, @value2)";

                // Create a MySqlCommand object with the SQL query and connection
                using (MySqlCommand command = new MySqlCommand(sqlQuery, connection))
                {
                    // Add parameters for the values to be inserted
                    command.Parameters.AddWithValue("@value1", parameters.name);
                    command.Parameters.AddWithValue("@value2", parameters.description);
                    command.ExecuteNonQuery();
                    // Execute the insert command

                    long lastInsertedId = command.LastInsertedId;
                    if (lastInsertedId == null)
                    {
                        myResponse.success = false;
                        myResponse.message = "Failure to insert into the table";
                    }
                    else
                    {
                        myResponse.insertedId = lastInsertedId;
                        myResponse = getLockTypes(connection, parameters, myResponse);
                    }

                }
            }
            return myResponse;
        }

        public void removeLockTypeReferences(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            var sqlQuery = "UPDATE locks SET lock_type = NULL WHERE lock_type = @value1";
            using (MySqlCommand command = new MySqlCommand(sqlQuery, connection))
            {
                command.Parameters.AddWithValue("@value1", parameters.lockTypeId);
                command.ExecuteNonQuery();
            }
        }
        public DAOResponseObject updateLockType(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            string sqlQuery = "";
            //DO I DO VALIDATION BEFORE, OR BY TABLE DEFINITIONS
            if (parameters.remove)
            {
                removeLockTypeReferences(connection, parameters, myResponse);
                sqlQuery = "DELETE from lockTypes WHERE id_lock_types = @value1";
            }
            else
            {
                sqlQuery = "UPDATE lockTypes " +
                    "SET name=@value2,description=@value3 " +
                    "WHERE id_lock_types = @value1";
            }

            using (MySqlCommand command = new MySqlCommand(sqlQuery, connection))
            {
                command.Parameters.AddWithValue("@value1", parameters.lockTypeId);
                if (!parameters.remove)
                {
                    command.Parameters.AddWithValue("@value2", parameters.name);
                    command.Parameters.AddWithValue("@value3", parameters.description);
                }
                try
                {
                    command.ExecuteNonQuery();
                    myResponse = getLockTypes(connection, parameters, myResponse);
                }
                catch (Exception ex)
                {
                    myResponse.success = false;
                    myResponse.message = "Failure to insert into the table-" + ex.Message;
                }
            }
            return myResponse;
        }

        //PROP/LOCATION FUNCTIONS
        public DAOResponseObject getPropNLocations(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            myResponse.PropNLocations.Clear();
            string sqlQuery = "SELECT * FROM props WHERE game = @value1";
            using (MySqlCommand command = new MySqlCommand(sqlQuery, connection))
            {

                command.Parameters.AddWithValue("@value1", parameters.gameId);
                // Execute the query and obtain a MySqlDataReader
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    // Loop through the rows returned by the query
                    while (reader.Read())
                    {
                        // Access columns by name or index
                        int propId = reader.GetInt32("id_props");
                        string name = reader.GetString("name");
                        string description = reader.GetString("description");
                        int parent = -1;
                        int parentIndex = reader.GetOrdinal("parent_prop");
                        if (!reader.IsDBNull(parentIndex))
                        {
                            parent = reader.GetInt32("parent_prop");
                        }
                        int accessPuzzle = -1;
                        int accessPuzzleIndex = reader.GetOrdinal("access_puzzle");
                        if (!reader.IsDBNull(accessPuzzleIndex))
                        {
                            accessPuzzle = reader.GetInt32("access_puzzle");
                        }
                        int game = reader.GetInt32("game");
                        PropNLocation propNLocation = new PropNLocation(propId, name, description, parent, accessPuzzle,game);
                        myResponse.PropNLocations.Add(propNLocation);
                    }
                }
                myResponse.gotProps = true;
                if (!myResponse.gotPuzzles)
                {
                    myResponse = getPuzzles(connection, parameters, myResponse);
                    myResponse.gotPuzzles = true;
                }
            }
            return myResponse;
        }
        public DAOResponseObject addPropNLocation(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            using (connection)
            {
                // Create a SQL query for the insert statement
                string sqlQuery = "INSERT INTO props (name, description, parent_prop, access_puzzle,game) VALUES (@value1, @value2, @value3, @value4, @value5)";

                // Create a MySqlCommand object with the SQL query and connection
                using (MySqlCommand command = new MySqlCommand(sqlQuery, connection))
                {
                    // Add parameters for the values to be inserted
                    command.Parameters.AddWithValue("@value1", parameters.name);
                    command.Parameters.AddWithValue("@value2", parameters.description);
                    if (parameters.parent == -1)
                    {
                        command.Parameters.AddWithValue("@value3", null);
                    }
                    else
                    {
                        command.Parameters.AddWithValue("@value3", parameters.parent);
                    }
                    if (parameters.puzzleId == -1)
                    {
                        command.Parameters.AddWithValue("@value4", null);
                    }
                    else
                    {
                        command.Parameters.AddWithValue("@value4", parameters.puzzleId);
                    }
                    command.Parameters.AddWithValue("@value5", parameters.gameId);
                    command.ExecuteNonQuery();
                    // Execute the insert command

                    long lastInsertedId = command.LastInsertedId;
                    if (lastInsertedId == null)
                    {
                        myResponse.success = false;
                        myResponse.message = "Failure to insert into the table";
                    }
                    else
                    {
                        myResponse.insertedId = lastInsertedId;
                        myResponse = getPropNLocations(connection, parameters, myResponse);
                    }

                }
            }
            return myResponse;
        }

        public void removePropNLocationReferences(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            var sqlQuery = "UPDATE props SET parent_prop = NULL WHERE parent_prop = @value1";
            using (MySqlCommand command = new MySqlCommand(sqlQuery, connection))
            {
                command.Parameters.AddWithValue("@value1", parameters.propId);
                command.ExecuteNonQuery();
            }
            //Items later
        }

        public DAOResponseObject updatePropNLocation(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            string sqlQuery = "";
            //DO I DO VALIDATION BEFORE, OR BY TABLE DEFINITIONS
            if (parameters.remove)
            {
                removePropNLocationReferences(connection,parameters,myResponse);
                sqlQuery = "DELETE from props WHERE id_props = @value1";
            }
            else
            {
                sqlQuery = "UPDATE props " +
                    "SET name=@value2,description=@value3,parent_prop=@value4,access_puzzle=@value5,game=@value6 " +
                    "WHERE id_props = @value1";

            }

            using (MySqlCommand command = new MySqlCommand(sqlQuery, connection))
            {
                command.Parameters.AddWithValue("@value1", parameters.propId);
                if (!parameters.remove)
                {
                    command.Parameters.AddWithValue("@value2", parameters.name);
                    command.Parameters.AddWithValue("@value3", parameters.description);
                    if(parameters.parent == -1)
                    {
                        command.Parameters.AddWithValue("@value4",null);
                    }
                    else
                    {
                        command.Parameters.AddWithValue("@value4", parameters.parent);
                    }
                    if (parameters.puzzleId == -1)
                    {
                        command.Parameters.AddWithValue("@value5", null); 
                    }
                    else
                    {
                        command.Parameters.AddWithValue("@value5", parameters.puzzleId);
                    }
                    command.Parameters.AddWithValue("@value6", parameters.gameId);
                }
                try
                {
                    command.ExecuteNonQuery();
                    myResponse = getPropNLocations(connection, parameters, myResponse);
                }
                catch (Exception ex)
                {
                    myResponse.success = false;
                    myResponse.message = "Failure to insert into the table-" + ex.Message;
                }
            }
            return myResponse;
        }

        public DAOResponseObject getItems(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            myResponse.Items.Clear();
            string sqlQuery = "SELECT * FROM items WHERE game = @value1";
            using (MySqlCommand command = new MySqlCommand(sqlQuery, connection))
            {

                command.Parameters.AddWithValue("@value1", parameters.gameId);
                // Execute the query and obtain a MySqlDataReader
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    // Loop through the rows returned by the query
                    while (reader.Read())
                    {
                        // Access columns by name or index
                        int itemId = reader.GetInt32("id_items");
                        string name = reader.GetString("name");
                        string description = reader.GetString("description");
                        int location = -1;
                        int locationIndex = reader.GetOrdinal("location");
                        if (!reader.IsDBNull(locationIndex))
                        {
                            location = reader.GetInt32("location");
                        }
                        int game = reader.GetInt32("game");
                        Item item = new Item(itemId, name, description, location, game);
                        myResponse.Items.Add(item);
                    }
                }
                myResponse.gotItems = true;
                if (!myResponse.gotProps)
                {
                    myResponse = getPropNLocations(connection, parameters, myResponse);
                    myResponse.gotProps = true;
                }
            }
            return myResponse;
        }
        public DAOResponseObject addItem(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            using (connection)
            {
                // Create a SQL query for the insert statement
                string sqlQuery = "INSERT INTO items (name, description, location, game) VALUES (@value1, @value2, @value3, @value4)";

                // Create a MySqlCommand object with the SQL query and connection
                using (MySqlCommand command = new MySqlCommand(sqlQuery, connection))
                {
                    // Add parameters for the values to be inserted
                    command.Parameters.AddWithValue("@value1", parameters.name);
                    command.Parameters.AddWithValue("@value2", parameters.description);
                    if (parameters.propId == -1)
                    {
                        command.Parameters.AddWithValue("@value3", null);
                    }
                    else
                    {
                        command.Parameters.AddWithValue("@value3", parameters.propId);
                    }
                    command.Parameters.AddWithValue("@value4", parameters.gameId);
                    command.ExecuteNonQuery();
                    // Execute the insert command

                    long lastInsertedId = command.LastInsertedId;
                    if (lastInsertedId == null)
                    {
                        myResponse.success = false;
                        myResponse.message = "Failure to insert into the table";
                    }
                    else
                    {
                        myResponse.insertedId = lastInsertedId;
                        myResponse = getItems(connection, parameters, myResponse);
                    }

                }
            }
            return myResponse;
        }

        public void removeItemReferences(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            var sqlQuery = "DELETE FROM puzzleitem WHERE item = @value1";
            using (MySqlCommand command = new MySqlCommand(sqlQuery, connection))
            {
                command.Parameters.AddWithValue("@value1", parameters.itemId);
                command.ExecuteNonQuery();
            }
        }

        public DAOResponseObject updateItem(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            string sqlQuery = "";
            if (parameters.remove)
            {
                removeItemReferences(connection, parameters, myResponse);
                sqlQuery = "DELETE from items WHERE id_items = @value1";
            }
            else
            {
                sqlQuery = "UPDATE items " +
                    "SET name=@value2,description=@value3,location=@value4,game=@value6 " +
                    "WHERE id_items = @value1";

            }

            using (MySqlCommand command = new MySqlCommand(sqlQuery, connection))
            {
                command.Parameters.AddWithValue("@value1", parameters.itemId);
                if (!parameters.remove)
                {
                    command.Parameters.AddWithValue("@value2", parameters.name);
                    command.Parameters.AddWithValue("@value3", parameters.description);
                    if (parameters.propId == -1)
                    {
                        command.Parameters.AddWithValue("@value4", null);
                    }
                    else
                    {
                        command.Parameters.AddWithValue("@value4", parameters.propId);
                    }
                    command.Parameters.AddWithValue("@value6", parameters.gameId);
                }
                try
                {
                    command.ExecuteNonQuery();
                    myResponse = getItems(connection, parameters, myResponse);
                }
                catch (Exception ex)
                {
                    myResponse.success = false;
                    myResponse.message = "Failure to insert into the table-" + ex.Message;
                }
            }
            return myResponse;
        }

        public DAOResponseObject getPuzzleItems(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            myResponse.PuzzleItems.Clear();
            string sqlQuery = "SELECT puzzleitem.*, puzzle.name AS puzzle_name, item.name AS item_name from puzzleitem " +
                "INNER JOIN puzzles puzzle ON(puzzleitem.puzzle = puzzle.id_puzzles)" +
                "INNER JOIN items item ON(puzzleitem.item = item.id_items)" +
                "WHERE puzzleitem.game = @value1";
            using (MySqlCommand command = new MySqlCommand(sqlQuery, connection))
            {
                command.Parameters.AddWithValue("@value1", parameters.gameId);
                // Execute the query and obtain a MySqlDataReader
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    // Loop through the rows returned by the query
                    while (reader.Read())
                    {
                        // Access columns by name or index
                        int puzzleIdItem = reader.GetInt32("id_puzzle_item");
                        int item = reader.GetInt32("item");
                        int puzzle = reader.GetInt32("puzzle");
                        int gameId = reader.GetInt32("game");
                        string itemName = reader.GetString("item_name");
                        string puzzleName = reader.GetString("puzzle_name");
                        PuzzleItem puzzleItem = new PuzzleItem(puzzleIdItem, item, puzzle, gameId, itemName, puzzleName);
                        myResponse.PuzzleItems.Add(puzzleItem);
                    }
                }
            }
            myResponse.gotPuzzleItems = true;
            return myResponse;
        }

        public DAOResponseObject updatePuzzleItems(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            myResponse = getPuzzleItems(connection,parameters,myResponse);
            List<int> newItemList = parameters.puzzleItems;
            List<int> puzzleItemsToAdd = new List<int>();
            List<int> puzzleItemsToRemove = new List<int>();
            for (int i = 0; i < myResponse.PuzzleItems.Count; i++)
            {
                if(myResponse.PuzzleItems[i].puzzle != parameters.puzzleId)
                {
                    continue;
                }
                int itemId = myResponse.PuzzleItems[i].item;
                if(newItemList.IndexOf(itemId) == -1)
                {
                    puzzleItemsToRemove.Add(itemId);
                }
                else
                {
                    newItemList.Remove(itemId);
                }
            }
            puzzleItemsToAdd = newItemList;
            //Get list of current puzzle item
            //compare to new list
            //add/remove whats different
            for (int i = 0; i < puzzleItemsToAdd.Count; i++)
            {
                PuzzleItem toAdd = new PuzzleItem(parameters.puzzleId, puzzleItemsToAdd[i]);
                parameters.puzzleItem = toAdd;
                addPuzzleItem(connection, parameters, myResponse);
            }
            for (int i = 0; i < puzzleItemsToRemove.Count; i++)
            {
                PuzzleItem toRemove = new PuzzleItem(parameters.puzzleId, puzzleItemsToRemove[i]);
                parameters.puzzleItem = toRemove;
                removePuzzleItem(connection, parameters, myResponse);
            }
            myResponse = getPuzzleItems(connection,parameters,myResponse);
            return myResponse;
        }

        public DAOResponseObject addPuzzleItem(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            using (connection)
            {
                // Create a SQL query for the insert statement
                string sqlQuery = "INSERT INTO puzzleitem (item, puzzle, game) VALUES (@value1, @value2, @value3)";

                // Create a MySqlCommand object with the SQL query and connection
                using (MySqlCommand command = new MySqlCommand(sqlQuery, connection))
                {
                    // Add parameters for the values to be inserted
                    command.Parameters.AddWithValue("@value1", parameters.puzzleItem.item);
                    command.Parameters.AddWithValue("@value2", parameters.puzzleItem.puzzle);
                    command.Parameters.AddWithValue("@value3", parameters.gameId);
                    command.ExecuteNonQuery();
                    // Execute the insert command

                    long lastInsertedId = command.LastInsertedId;
                    if (lastInsertedId == null)
                    {
                        myResponse.success = false;
                        myResponse.message = "Failure to insert into the table";
                    }
                    else
                    {
                        myResponse.insertedId = lastInsertedId;
                    }
                }
            }
            return myResponse;
        }
        public DAOResponseObject removePuzzleItem(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {

            string sqlQuery = "DELETE from puzzleitem WHERE item = @value1 AND puzzle = @value2";
            using (MySqlCommand command = new MySqlCommand(sqlQuery, connection))
            {
                command.Parameters.AddWithValue("@value1", parameters.puzzleItem.item);
                command.Parameters.AddWithValue("@value2", parameters.puzzleItem.puzzle);
                try
                {
                    command.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    myResponse.success = false;
                    myResponse.message = "Failure to insert into the table-" + ex.Message;
                }
            }
            return myResponse;
        }

        public DAOResponseObject getClues(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            myResponse.Clues.Clear();
            string sqlQuery = "SELECT * FROM clues WHERE clue_puzzle = @value1";
            using (MySqlCommand command = new MySqlCommand(sqlQuery, connection))
            {

                command.Parameters.AddWithValue("@value1", parameters.puzzleId);
                // Execute the query and obtain a MySqlDataReader
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    // Loop through the rows returned by the query
                    while (reader.Read())
                    {
                        // Access columns by name or index
                        int clueId = reader.GetInt32("id_clues");
                        string clueText = reader.GetString("clue_text");
                        int puzzle = reader.GetInt32("clue_puzzle");
                        Clue clue = new Clue(clueId, clueText, puzzle);
                        myResponse.Clues.Add(clue);
                    }
                }
                myResponse.gotClues = true;
            }
            return myResponse;
        }
        public DAOResponseObject addClue(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            using (connection)
            {
                // Create a SQL query for the insert statement
                string sqlQuery = "INSERT INTO clues(clue_text, clue_puzzle) VALUES (@value1, @value2)";

                // Create a MySqlCommand object with the SQL query and connection
                using (MySqlCommand command = new MySqlCommand(sqlQuery, connection))
                {
                    // Add parameters for the values to be inserted
                    command.Parameters.AddWithValue("@value1", parameters.description);
                    command.Parameters.AddWithValue("@value2", parameters.puzzleId);
                    command.ExecuteNonQuery();
                    // Execute the insert command

                    long lastInsertedId = command.LastInsertedId;
                    if (lastInsertedId == null)
                    {
                        myResponse.success = false;
                        myResponse.message = "Failure to insert into the table";
                    }
                    else
                    {
                        myResponse.insertedId = lastInsertedId;
                    }

                }
            }
            return myResponse;
        }

        public DAOResponseObject updateClue(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            string sqlQuery = "";
            if (parameters.remove)
            {
                removeItemReferences(connection, parameters, myResponse);
                sqlQuery = "DELETE from clues WHERE id_clues = @value1";
            }
            else
            {
                sqlQuery = "UPDATE clues " +
                    "SET clue_text=@value2 " +
                    "WHERE id_clues = @value1";

            }

            using (MySqlCommand command = new MySqlCommand(sqlQuery, connection))
            {
                command.Parameters.AddWithValue("@value1", parameters.clueId);
                if (!parameters.remove)
                {
                    command.Parameters.AddWithValue("@value2", parameters.description);
                }
                try
                {
                    command.ExecuteNonQuery();
                }
                catch (Exception ex)
                {
                    myResponse.success = false;
                    myResponse.message = "Failure to insert into the table-" + ex.Message;
                }
            }
            return myResponse;
        }
    }
}
