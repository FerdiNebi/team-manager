using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using TeamManager.FeedbackService.Data;

namespace TeamManager.FeedbackService
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().MigrateDatabase<FeedbackContext>().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
    }
}
