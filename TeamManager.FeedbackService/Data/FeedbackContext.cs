using Microsoft.EntityFrameworkCore;
using TeamManager.FeedbackService.Model;

namespace TeamManager.FeedbackService.Data
{
    public class FeedbackContext : DbContext
    {
        public FeedbackContext(DbContextOptions<FeedbackContext> options)
            : base(options)
        {
        }

        public DbSet<Feedback> Feedbacks { get; set; }
    }
}