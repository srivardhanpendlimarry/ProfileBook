using System.ComponentModel.DataAnnotations.Schema;

namespace ProfileBook.API.Models
{
    public class Message
    {
        public int MessageId { get; set; }

        [ForeignKey("Sender")]
        public int SenderId { get; set; }

        [ForeignKey("Receiver")]
        public int ReceiverId { get; set; }

        public string MessageContent { get; set; } = string.Empty;

        public DateTime TimeStamp { get; set; } = DateTime.UtcNow;

        // Navigation
        public User Sender { get; set; } = null!;
        public User Receiver { get; set; } = null!;
    }
}