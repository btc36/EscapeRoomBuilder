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
            }
            finally
            {
                connection.Close();
                // Ensure the connection is properly closed.
            }
            return myResponse;
        }

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
                        Game game = new Game(gameId, name, userId);
                        myResponse.Games.Add(game);
                    }
                }
            }
            return myResponse;
        }

    }
}
