using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProfileBook.API.Data;
using ProfileBook.API.Models;

namespace ProfileBook.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReportController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ReportController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/report
        [HttpGet]
        public async Task<IActionResult> GetAllReports()
        {
            var reports = await _context.Reports
                .Include(r => r.ReportedUser)
                .Include(r => r.ReportingUser)
                .Select(r => new
                {
                    r.ReportId,
                    r.ReportedUserId,
                    ReportedUsername = r.ReportedUser.Username,
                    r.ReportingUserId,
                    ReportingUsername = r.ReportingUser.Username,
                    r.Reason,
                    r.TimeStamp
                }).ToListAsync();

            return Ok(reports);
        }

        // POST: api/report
        [HttpPost]
        public async Task<IActionResult> CreateReport([FromBody] CreateReportDTO dto)
        {
            var report = new Report
            {
                ReportedUserId = dto.ReportedUserId,
                ReportingUserId = dto.ReportingUserId,
                Reason = dto.Reason,
                TimeStamp = DateTime.UtcNow
            };

            _context.Reports.Add(report);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Report submitted successfully!" });
        }

        // DELETE: api/report/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReport(int id)
        {
            var report = await _context.Reports.FindAsync(id);
            if (report == null)
                return NotFound("Report not found!");

            _context.Reports.Remove(report);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Report deleted successfully!" });
        }
    }

    public class CreateReportDTO
    {
        public int ReportedUserId { get; set; }
        public int ReportingUserId { get; set; }
        public string Reason { get; set; } = string.Empty;
    }
}