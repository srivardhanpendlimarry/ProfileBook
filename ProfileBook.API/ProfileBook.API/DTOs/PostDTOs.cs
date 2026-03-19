namespace ProfileBook.API.DTOs
{
    public class CreatePostDTO
    {
        public string Content { get; set; } = string.Empty;
        public string? PostImage { get; set; }
    }

    public class PostResponseDTO
    {
        public int PostId { get; set; }
        public int UserId { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string? PostImage { get; set; }
        public string Status { get; set; } = string.Empty;
        public int? Likes { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}