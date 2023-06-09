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
        //I will start with an inherent user
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

        //update Game
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
        //Add Game

        //getItems
        //addItem
        //updateItem

        //getLocks
        //addLock
        //updateLock

        //getLockTypes
        //addLockType
        //updateLockType

        //getProps
        //addProp
        //updateProp

        //getPuzzles
        //addPuzzle
        //updatePuzzle

        //getPuzzleItemLinks
        //addPuzzleItemLink
        //updatePuzzleItemLink

        //getStages
        //addStage
        //updateStage


        //getRunGameData
    }
}
