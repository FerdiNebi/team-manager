using Microsoft.EntityFrameworkCore;

namespace TeamManager.PeopleService.Models
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