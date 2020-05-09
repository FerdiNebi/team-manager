using System;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<FeedbackViewModel> CreateAsync(FeedbackViewModel feedbackViewModel)
        {
            var feedback = new Feedback(feedbackViewModel);
            if (!this.context.Feedbacks.Any(f => f.PersonId == feedback.PersonId && f.From == feedback.From && f.Content == feedback.Content))
            {
                this.context.Add(feedback);
                await this.context.SaveChangesAsync();
            }

            return new FeedbackViewModel(feedback);
        }

        public async Task<bool> DeleteAsync(Guid feedbackId)
        {
            var feedback = this.context.Find<Feedback>(feedbackId);
            this.context.Remove(feedback);
            await this.context.SaveChangesAsync();

            return true;
        }

        public async Task<FeedbackViewModel> GetAsync(Guid id)
        {
            var feedback = await this.context.Feedbacks.FindAsync(id);
            return new FeedbackViewModel(feedback);
        }

        public async Task<IEnumerable<FeedbackViewModel>> GetAllAsync(Guid personId)
        {
            var feedbackItems = await this.context.Feedbacks.Where(f => f.PersonId == personId).OrderBy(f => f.CreatedOn).AsNoTracking().ToListAsync();
            return feedbackItems.Select(f => new FeedbackViewModel(f));
        }

        public async Task<FeedbackViewModel> UpdateAsync(FeedbackViewModel feedbackViewModel)
        {
            var feedback = new Feedback(feedbackViewModel);
            this.context.Update(feedback);
            await this.context.SaveChangesAsync();

            return feedbackViewModel;
        }
    }
}