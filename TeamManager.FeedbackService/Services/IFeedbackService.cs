using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TeamManager.FeedbackService.Model;

namespace TeamManager.FeedbackService.Services
{
    public interface IFeedbackService
    {
         Task<IEnumerable<Feedback>> GetAllAsync(Guid personId);

         Task<Feedback> GetAsync(Guid id);

         Task<bool> DeleteAsync(Feedback feedback);

         Task<Feedback> CreateAsync(Feedback feedback);

         Task<Feedback> UpdateAsync(Feedback feedback);
    }
}