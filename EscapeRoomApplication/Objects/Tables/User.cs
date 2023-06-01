namespace EscapeRoomApplication.Objects.Tables
{
    public class User
    {
        public User(int userId, string userName)
        {
            this.userId = userId;
            this.userName = userName;
        }
        public int userId { get; set; }
        public string userName { get; set; }
       
    }
}
