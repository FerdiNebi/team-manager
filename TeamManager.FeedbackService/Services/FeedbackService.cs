using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TeamManager.FeedbackService.Data;
using TeamManager.FeedbackService.Model;

namespace TeamManager.FeedbackService.Services
{
    public class FeedbackService : IFeedbackService
    {
        private readonly FeedbackContext context;

        public FeedbackService(FeedbackContext context)
        {
            this.context = context;
        }
        public async Task<Feedback> CreateAsync(Feedback feedback)
        {
            this.context.Add(feedback);
            await this.context.SaveChangesAsync();

            return feedback;
        }

        public async Task<bool> DeleteAsync(Feedback feedback)
        {
            if (this.context.Entry(feedback).State == EntityState.Detached)
            {
                this.context.Attach(feedback);
            }

            this.context.Remove(feedback);
            await this.context.SaveChangesAsync();
            
            return true;
        }

        public async Task<Feedback> GetAsync(Guid id)
        {
            return await this.context.Feedbacks.FindAsync(id);
        }

        public async Task<IEnumerable<Feedback>> GetAllAsync()
        {
            return await this.context.Feedbacks.AsNoTracking().ToListAsync();
        }

        public async Task<Feedback> UpdateAsync(Feedback feedback)
        {
            this.context.Update(feedback);
            await this.context.SaveChangesAsync();

            return feedback;
        }
    }
}