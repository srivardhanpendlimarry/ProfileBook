using System.ComponentModel.DataAnnotations.Schema;

namespace ProfileBook.API.Models
{
    public class Report
    {
        public int ReportId { get; set; }

        [ForeignKey("ReportedUser")]
        public int ReportedUserId { get; set; }

        [ForeignKey("ReportingUser")]
        public int ReportingUserId { get; set; }

        public string Reason { get; set; } = string.Empty;

        public DateTime TimeStamp { get; set; } = DateTime.UtcNow;

        // Navigation
        public User ReportedUser { get; set; } = null!;
        public User ReportingUser { get; set; } = null!;
    }
}