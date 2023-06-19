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

        public DAOResponseObject updateGame(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            //DO I DO VALIDATION BEFORE, OR BY TABLE DEFINITIONS
            if (parameters.remove)
            {

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
                        myResponse.insertedId = lastInsertedId;
                        myResponse = getStages(connection,parameters,myResponse);
                    }

                }
            }
            return myResponse;
        }

        //updateStage
        public DAOResponseObject updateStage(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            string sqlQuery = "";
            //DO I DO VALIDATION BEFORE, OR BY TABLE DEFINITIONS
            if (parameters.remove)
            {
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
            string sqlQuery = "SELECT * FROM puzzles WHERE stage = @value1";
            using (MySqlCommand command = new MySqlCommand(sqlQuery, connection))
            {
                // Execute the query and obtain a MySqlDataReader
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    command.Parameters.AddWithValue("@value1", parameters.stageId);
                    // Loop through the rows returned by the query
                    while (reader.Read())
                    {
                        // Access columns by name or index
                        int puzzleId = reader.GetInt32("id_puzzles");
                        string name = reader.GetString("name");
                        string description = reader.GetString("description");
                        int stageId = reader.GetInt32("stage");
                        int lockId = reader.GetInt32("lock");
                        Puzzle puzzle = new Puzzle(puzzleId,name,description, stageId, lockId);
                        myResponse.Puzzles.Add(puzzle);
                    }
                }
            }
            return myResponse;
        }
        //addStage
        public DAOResponseObject addPuzzle(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            using (connection)
            {
                // Create a SQL query for the insert statement
                string sqlQuery = "INSERT INTO puzzles (name, description, stage, lock) VALUES (@value1, @value2, @value3, @value4)";

                // Create a MySqlCommand object with the SQL query and connection
                using (MySqlCommand command = new MySqlCommand(sqlQuery, connection))
                {
                    // Add parameters for the values to be inserted
                    command.Parameters.AddWithValue("@value1", parameters.name);
                    command.Parameters.AddWithValue("@value2", parameters.description);
                    command.Parameters.AddWithValue("@value3", parameters.stageId);
                    command.Parameters.AddWithValue("@value3", parameters.lockId);
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
                        myResponse = getPuzzles(connection, parameters, myResponse);
                    }

                }
            }
            return myResponse;
        }

        public DAOResponseObject updatePuzzle(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            string sqlQuery = "";
            //DO I DO VALIDATION BEFORE, OR BY TABLE DEFINITIONS
            if (parameters.remove)
            {
                sqlQuery = "DELETE from puzzles WHERE id_puzzles = @value1";
            }
            else
            {
                sqlQuery = "UPDATE puzzles" +
                    "SET name=@value2,description=@value3,stage=@value4,lock=@value5 " +
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
                    myResponse = getPuzzles(connection, parameters, myResponse);
                }
                catch (Exception ex)
                {
                    myResponse.success = false;
                    myResponse.message = "Failure to insert into the table-" + ex.Message;
                }
            }
            return myResponse;
        }

        //Lock FUNCTIONS
        public DAOResponseObject getLocks(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            string sqlQuery = "SELECT * FROM locks WHERE game = @gameId";
            using (MySqlCommand command = new MySqlCommand(sqlQuery, connection))
            {
                // Execute the query and obtain a MySqlDataReader
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    command.Parameters.AddWithValue("@value1", parameters.gameId);
                    // Loop through the rows returned by the query
                    while (reader.Read())
                    {
                        // Access columns by name or index
                        int lockId = reader.GetInt32("id_locks");
                        string name = reader.GetString("name");
                        string description = reader.GetString("description");
                        string combo = reader.GetString("combo");
                        int lock_type = reader.GetInt32("lock_type");
                        int game = reader.GetInt32("game");
                        Lock myLock = new Lock(lockId,combo,lock_type,description,name,game);
                        myResponse.Locks.Add(myLock);
                    }
                }
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

        public DAOResponseObject updateLock(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            string sqlQuery = "";
            //DO I DO VALIDATION BEFORE, OR BY TABLE DEFINITIONS
            if (parameters.remove)
            {
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

        public DAOResponseObject updateLockType(MySqlConnection connection, DAOParametersObject parameters, DAOResponseObject myResponse)
        {
            string sqlQuery = "";
            //DO I DO VALIDATION BEFORE, OR BY TABLE DEFINITIONS
            if (parameters.remove)
            {
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

    }
}
