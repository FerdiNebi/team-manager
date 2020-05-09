using System;
using TeamManager.Shared.Cryptography;

namespace TeamManager.FeedbackService.Model
{
    public class FeedbackViewModel
    {
        public FeedbackViewModel()
        {
            
        }
        
        public FeedbackViewModel(Feedback feedback)
        {
            this.Id = feedback.Id;
            this.PersonId = feedback.PersonId;
            this.CreatedOn = feedback.CreatedOn;
            this.From = feedback.From;
            this.FromPersonId  = feedback.FromPersonId;
            this.FeedbackType = feedback.FeedbackType;
            this.Content = Encryptor.Decrypt(feedback.Content);
        }

        public Guid Id { get; set; }

        public Guid PersonId { get; set; }

        public DateTime CreatedOn { get; set; }

        public string From { get; set; }

        public Guid FromPersonId { get; set; }

        public string Content { get; set; }

        public FeedbackType FeedbackType { get; set; }

    }
}