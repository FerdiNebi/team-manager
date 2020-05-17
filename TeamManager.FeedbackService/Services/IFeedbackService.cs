using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TeamManager.FeedbackService.Model;

namespace TeamManager.FeedbackService.Services
{
    public interface IFeedbackService
    {
         Task<IEnumerable<FeedbackViewModel>> GetAllAsync(Guid personId);

         Task<FeedbackViewModel> GetAsync(Guid id);

         Task<bool> DeleteAsync(Guid feedbackId);

         Task<bool> DeleteAllForPersonAsync(Guid personId);

         Task<FeedbackViewModel> CreateAsync(FeedbackViewModel feedback);

         Task<FeedbackViewModel> UpdateAsync(FeedbackViewModel feedback);
    }
}