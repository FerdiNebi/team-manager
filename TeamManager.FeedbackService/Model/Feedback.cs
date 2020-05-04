using System;
using System.ComponentModel.DataAnnotations;
using TeamManager.Shared.Cryptography;

namespace TeamManager.FeedbackService.Model
{
    public class Feedback
    {
        [Key]
        public Guid Id { get; set; }

        public Guid PersonId { get; set; }

        public DateTime CreatedOn { get; set; }

        public string From { get; set; }

        public Guid FromPersonId { get; set; }

        public string Content
        {
            get
            {
                return Encryptor.Decrypt(this.content);
            }

            set
            {
                this.content = Encryptor.Encrypt(value);
            }
        }

        public FeedbackType FeedbackType { get; set; }

        private string content;
    }
}