using System.ComponentModel.DataAnnotations.Schema;

namespace ProfileBook.API.Models
{
    public class Comment
    {
        public int CommentId { get; set; }

        [ForeignKey("Post")]
        public int PostId { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        public string Content { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation
        public Post Post { get; set; } = null!;
        public User User { get; set; } = null!;
    }
}