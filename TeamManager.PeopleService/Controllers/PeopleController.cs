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

        [HttpPost]
        public async Task<Person> Post([FromBody] string name)
        {
            if (!string.IsNullOrWhiteSpace(name)){
                var person = new Person();
                person.Name = name;
                this._context.Add(person);
                await this._context.SaveChangesAsync();

                return person;
            }

            return null;
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public async Task<bool> Delete(Guid id)
        {
            var person = this._context.People.Find(id);
            if (person != null){
                this._context.Remove(person);
                await this._context.SaveChangesAsync();
                return true;
            }

            return false;
        }
    }
}
