using Microsoft.EntityFrameworkCore;
using TeamManager.PeopleService.Models;

namespace TeamManager.PeopleService.Data
{
    public class PeopleServiceContext : DbContext
    {
        public PeopleServiceContext(DbContextOptions<PeopleServiceContext> options)
            : base(options)
        {
        }

        public DbSet<Person> People { get; set; }
    }
}