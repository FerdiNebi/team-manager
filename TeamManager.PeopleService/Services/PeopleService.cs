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
        private readonly string userId;

        public PeopleService(PeopleServiceContext context, IUserService userService)
        {
            this._context = context;
            this.userId = userService.GetUserSubject();

            if (string.IsNullOrWhiteSpace(this.userId))
                throw new ArgumentNullException("userId");

            if (this._context.People.Where(u => u.UserId == this.userId).Count() == 0)
            {
                this._context.People.Add(new Person() { Name = "John", UserId = this.userId });
                this._context.SaveChanges();
            }
        }

        public async Task<Person> CreatePersonAsync(string name)
        {
            if (string.IsNullOrWhiteSpace(this.userId))
                throw new ArgumentNullException("userId");

            if (!string.IsNullOrWhiteSpace(name))
            {
                var person = new Person();
                person.Name = name;
                person.UserId = this.userId;
                this._context.Add(person);
                await this._context.SaveChangesAsync();

                return person;
            }

            return null;
        }

        public async Task<bool> DeletePersonAsync(Guid id)
        {
            if (string.IsNullOrWhiteSpace(this.userId))
                throw new ArgumentNullException("userId");

            var person = this._context.People.Where(u => u.UserId == this.userId && u.Id == id).FirstOrDefault();
            if (person != null)
            {
                this._context.Remove(person);
                await this._context.SaveChangesAsync();
                return true;
            }

            return false;
        }

        public async Task<IEnumerable<Person>> GetPeopleAsync()
        {
            return await this._context.People.Where(u => u.UserId == this.userId).OrderBy(p => p.Name).ToListAsync();
        }
    }
}