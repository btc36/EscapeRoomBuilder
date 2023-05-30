using MySqlConnector;

namespace EscapeRoomApplication
{
    public class EscapeRoomDAO
    {
        public MySqlConnection getConnection()
        {
            string connectionString = "server=127.0.0.1;port=3306;database=escaperoomdb;uid=root;password=cooksben001";
            MySqlConnection connection = new MySqlConnection(connectionString);
            return connection;
        }

        public string sampleFunction(Object stuff)
        {
            MySqlConnection connection = getConnection();
            Object result = new object();
            try
            {
                connection.Open();
                // Connection opened successfully. You can perform database operations here.
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
            return "TESTING";
        }

    }
}
