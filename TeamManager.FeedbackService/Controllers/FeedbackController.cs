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
        public async Task<ActionResult<IEnumerable<Feedback>>> Get([FromQuery]Guid personId)
        {
            var feedbackItems = await this.service.GetAllAsync(personId);
            return Ok(feedbackItems);
        }

        // [HttpGet("{id}")]
        // public async Task<ActionResult<Feedback>> Get(Guid id)
        // {
        //     var feedbackItem = await this.service.GetAsync(id);
        //     if (feedbackItem == null)
        //         return BadRequest();

        //     return Ok(feedbackItem);
        // }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] FeedbackViewModel feedback)
        {
            if (this.ModelState.IsValid)
            {
                await this.service.CreateAsync(feedback);
                return CreatedAtRoute(string.Empty, feedback);
            }

            return BadRequest();
        }

        [HttpPost("batchCreate")]
        public async Task<ActionResult> BatchCreate([FromBody] FeedbackViewModel[] feedbacks)
        {
            if (this.ModelState.IsValid)
            {
                foreach (var feedback in feedbacks)
                {
                    await this.service.CreateAsync(feedback);
                }

                return Ok();
            }

            return BadRequest();
        }

        [HttpPut("{id}")]
        public void Put(Guid id, [FromBody] string value)
        {
        }

        [HttpDelete("{id}")]
        public async Task Delete(Guid id)
        {
            await this.service.DeleteAsync(id);
        }
    }
}
