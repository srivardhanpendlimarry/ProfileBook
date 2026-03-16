namespace ProfileBook.API.Models
{
    public class Group
    {
        public int GroupId { get; set; }
        public string GroupName { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<UserGroup> UserGroups { get; set; } = new List<UserGroup>();
    }

    public class UserGroup
    {
        public int UserId { get; set; }
        public int GroupId { get; set; }
        public User User { get; set; } = null!;
        public Group Group { get; set; } = null!;
    }
}