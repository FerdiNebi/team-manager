using System;
using System.ComponentModel.DataAnnotations;
using TeamManager.Shared.Cryptography;

namespace TeamManager.FeedbackService.Model
{
    public class Feedback
    {
        public Feedback()
        {            
        }
        
        public Feedback(FeedbackViewModel feedback)
        {
            this.Id = feedback.Id;
            this.PersonId = feedback.PersonId;
            this.CreatedOn = feedback.CreatedOn;
            this.From = feedback.From;
            this.FromPersonId  = feedback.FromPersonId;
            this.FeedbackType = feedback.FeedbackType;
            this.Content = Encryptor.Encrypt(feedback.Content);
        }

        [Key]
        public Guid Id { get; set; }

        public Guid PersonId { get; set; }

        public DateTime CreatedOn { get; set; }

        public string From { get; set; }

        public Guid FromPersonId { get; set; }

        public string Content { get; set; }

        public FeedbackType FeedbackType { get; set; }

    }
}