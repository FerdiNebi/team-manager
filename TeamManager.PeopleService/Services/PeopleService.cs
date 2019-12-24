using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TeamManager.PeopleService.Data;
using TeamManager.PeopleService.Models;

namespace TeamManager.PeopleService.Services
{
    public class PeopleService : IPeopleService
    {
        private readonly PeopleServiceContext _context;

        public PeopleService(PeopleServiceContext context)
        {
            this._context = context;

            if (this._context.People.Count() == 0)
            {
                this._context.People.Add(new Person() { Name = "John" });
                this._context.SaveChanges();
            }
        }

        public async Task<Person> CreatePersonAsync(string name)
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

        public async Task<bool> DeletePersonAsync(Guid id)
        {
             var person = this._context.People.Find(id);
            if (person != null){
                this._context.Remove(person);
                await this._context.SaveChangesAsync();
                return true;
            }

            return false;
        }

        public async Task<IEnumerable<Person>> GetPeopleAsync()
        {
            return await this._context.People.ToListAsync();
        }
    }
}