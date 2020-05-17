using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.DependencyInjection;
using TeamManager.FeedbackService.Data;
using TeamManager.FeedbackService.Services;
using TeamManager.Shared.Authentication;
using TeamManager.Shared.Cryptography;
using RabbitMQ.Client;
using TeamManager.Shared.Messaging;
using System;
using System.Linq;
using Microsoft.Extensions.Logging;

namespace TeamManager.FeedbackService
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            Encryptor.Password = Configuration.GetValue<string>("EncryptionKey");
            services.AddDbContext<FeedbackContext>(opt => opt.UseSqlServer(Configuration.GetConnectionString("TeamManager")));
            services.AddCors();
            services.AddRazorPages().AddNewtonsoftJson();
            services.AddControllers(config =>
            {
                var policy = new AuthorizationPolicyBuilder()
                                .RequireAuthenticatedUser()
                                .Build();
                config.Filters.Add(new AuthorizeFilter(policy));
            });

            services.AddScoped<IFeedbackService, TeamManager.FeedbackService.Services.FeedbackService>();
            services.AddAzureAuthentication();
            services.AddSingleton<IConnectionFactory>(sp =>
            {
                return new ConnectionFactory() { HostName = "servicebus" };
            });

            services.AddSingleton(typeof(IServiceBus), typeof(RabbitMQClient));

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseRouting();

            // app.UseHttpsRedirection();
            app.UseCors(options =>
                options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
            );

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            ConfigureEventBus(app);
        }

        private void ConfigureEventBus(IApplicationBuilder app)
        {
            var logger = app.ApplicationServices.GetRequiredService<ILogger<Program>>();
            var life = app.ApplicationServices.GetService<Microsoft.Extensions.Hosting.IHostApplicationLifetime>();
            life.ApplicationStarted.Register(() =>
            { 
                System.Threading.Thread.Sleep(120000);
                var serviceBus = app.ApplicationServices.GetRequiredService<IServiceBus>();
                serviceBus.SubscribeForQueue("personDeleted", async (message) =>
                {
                    using (var scope = app.ApplicationServices.CreateScope())
                    {
                        var feedbackService = scope.ServiceProvider.GetRequiredService<IFeedbackService>();
                        await feedbackService.DeleteAllForPersonAsync(Guid.Parse(message));
                    }
                });
            });
        }
    }
}
