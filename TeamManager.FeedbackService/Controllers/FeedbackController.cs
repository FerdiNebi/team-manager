using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TeamManager.FeedbackService.Model;
using TeamManager.FeedbackService.Services;

namespace TeamManager.FeedbackService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly IFeedbackService service;

        public FeedbackController(IFeedbackService service)
        {
            this.service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Feedback>>> Get()
        {
            var feedbackItems = await this.service.GetAllAsync();
            return Ok(feedbackItems);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Feedback>> Get(Guid id)
        {
            var feedbackItem = await this.service.GetAsync(id);
            if (feedbackItem == null)
                return BadRequest();

            return Ok(feedbackItem);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Feedback feedback)
        {
            if (this.ModelState.IsValid)
            {
                await this.service.CreateAsync(feedback);
                return Ok();
            }

            return BadRequest();
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
