using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProfileBook.API.Data;
using ProfileBook.API.DTOs;
using ProfileBook.API.Models;

namespace ProfileBook.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MessageController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MessageController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/message/5
        [HttpGet("{userId}")]
        public async Task<IActionResult> GetMessages(int userId)
        {
            var messages = await _context.Messages
                .Include(m => m.Sender)
                .Include(m => m.Receiver)
                .Where(m => m.SenderId == userId || m.ReceiverId == userId)
                .Select(m => new MessageResponseDTO
                {
                    MessageId = m.MessageId,
                    SenderId = m.SenderId,
                    SenderUsername = m.Sender.Username,
                    ReceiverId = m.ReceiverId,
                    ReceiverUsername = m.Receiver.Username,
                    MessageContent = m.MessageContent,
                    TimeStamp = m.TimeStamp
                }).ToListAsync();

            return Ok(messages);
        }

        // POST: api/message
        [HttpPost]
        public async Task<IActionResult> SendMessage([FromBody] SendMessageDTO dto, [FromQuery] int senderId)
        {
            var message = new Message
            {
                SenderId = senderId,
                ReceiverId = dto.ReceiverId,
                MessageContent = dto.MessageContent,
                TimeStamp = DateTime.UtcNow
            };

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Message sent successfully!" });
        }

        // DELETE: api/message/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMessage(int id)
        {
            var message = await _context.Messages.FindAsync(id);
            if (message == null)
                return NotFound("Message not found!");

            _context.Messages.Remove(message);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Message deleted successfully!" });
        }
    }
}