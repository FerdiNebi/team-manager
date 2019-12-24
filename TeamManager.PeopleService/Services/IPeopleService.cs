using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using TeamManager.PeopleService.Models;

namespace TeamManager.PeopleService.Services
{
    public interface IPeopleService
    {
        Task<IEnumerable<Person>> GetPeopleAsync();

        Task<Person> CreatePersonAsync(string name);

        Task<bool> DeletePersonAsync(Guid id);
    }
}