using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProfileBook.API.Data;
using ProfileBook.API.DTOs;
using ProfileBook.API.Models;

namespace ProfileBook.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PostController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPosts()
        {
            var posts = await _context.Posts
                .Include(p => p.User)
                .Where(p => p.Status == "Approved")
                .Select(p => new PostResponseDTO
                {
                    PostId = p.PostId,
                    UserId = p.UserId,
                    Username = p.User.Username,
                    Content = p.Content,
                    PostImage = p.PostImage,
                    Status = p.Status,
                    CreatedAt = p.CreatedAt
                }).ToListAsync();

            return Ok(posts);
        }

        [HttpGet("pending")]
        public async Task<IActionResult> GetPendingPosts()
        {
            var posts = await _context.Posts
                .Include(p => p.User)
                .Where(p => p.Status == "Pending")
                .Select(p => new PostResponseDTO
                {
                    PostId = p.PostId,
                    UserId = p.UserId,
                    Username = p.User.Username,
                    Content = p.Content,
                    PostImage = p.PostImage,
                    Status = p.Status,
                    CreatedAt = p.CreatedAt
                }).ToListAsync();

            return Ok(posts);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePost([FromBody] CreatePostDTO dto, [FromQuery] int userId)
        {
            var post = new Post
            {
                UserId = userId,
                Content = dto.Content,
                PostImage = dto.PostImage,
                Status = "Pending"
            };

            _context.Posts.Add(post);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Post submitted for approval!" });
        }

        [HttpPut("approve/{id}")]
        public async Task<IActionResult> ApprovePost(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null)
                return NotFound("Post not found!");

            post.Status = "Approved";
            await _context.SaveChangesAsync();

            return Ok(new { message = "Post approved successfully!" });
        }

        [HttpPut("reject/{id}")]
        public async Task<IActionResult> RejectPost(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null)
                return NotFound("Post not found!");

            post.Status = "Rejected";
            await _context.SaveChangesAsync();

            return Ok(new { message = "Post rejected!" });
        }

        // PUT: api/post/like/5
        [HttpPut("like/{id}")]
        public async Task<IActionResult> LikePost(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null)
                return NotFound("Post not found!");

            post.Likes = (post.Likes ?? 0) + 1;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Post liked!", likes = post.Likes });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null)
                return NotFound("Post not found!");

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Post deleted successfully!" });
        }
    }
}