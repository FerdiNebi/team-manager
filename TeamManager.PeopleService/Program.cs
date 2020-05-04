using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using TeamManager.PeopleService.Data;
using TeamManager.Shared;

namespace TeamManager.PeopleService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().MigrateDatabase<PeopleServiceContext>().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args)
        {
            return Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
        }
    }
}
