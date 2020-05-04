using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using TeamManager.FeedbackService.Data;
using TeamManager.Shared;

namespace TeamManager.FeedbackService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().MigrateDatabase<FeedbackContext>().Run();
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
