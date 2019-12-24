using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TeamManager.PeopleService.Models;
using TeamManager.PeopleService.Services;

namespace TeamManager.PeopleService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly IPeopleService peopleService;

        public PeopleController(IPeopleService _peopleService)
        {
            this.peopleService = _peopleService;
        }

        // GET api/values
        [HttpGet]
        public async Task<IEnumerable<Person>> Get()
        {
            return await this.peopleService.GetPeopleAsync();
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] string name)
        {
            Person person = await this.peopleService.CreatePersonAsync(name);
            if (person != null)
            {
                return Ok(person);
            }

            return BadRequest();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(Guid id)
        {
            bool deleted = await this.peopleService.DeletePersonAsync(id);
            if (deleted)
            {
                return Ok();
            }

            return BadRequest();
        }
    }
}
