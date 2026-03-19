namespace ProfileBook.API.DTOs
{
    public class CreateCommentDTO
    {
        public int PostId { get; set; }
        public string Content { get; set; } = string.Empty;
    }

    public class CommentResponseDTO
    {
        public int CommentId { get; set; }
        public int PostId { get; set; }
        public int UserId { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
    }
}