using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TeamManager.PeopleService.Models;

namespace TeamManager.PeopleService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly PeopleServiceContext _context;

        public PeopleController(PeopleServiceContext context)
        {
            this._context = context;

            if (this._context.People.Count() == 0)
            {
                this._context.People.Add(new Person() { Name = "John" });
                this._context.SaveChanges();
            }
        }

        // GET api/values
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Person>>> Get()
        {
            return await this._context.People.ToListAsync();
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
