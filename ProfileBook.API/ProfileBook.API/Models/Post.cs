using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProfileBook.API.Models
{
    public class Post
    {
        public int PostId { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }

        [Required]
        public string Content { get; set; } = string.Empty;

        public string? PostImage { get; set; }

        public string Status { get; set; } = "Pending";

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation
        public User User { get; set; } = null!;
    }
}