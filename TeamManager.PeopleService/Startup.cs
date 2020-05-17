using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using RabbitMQ.Client;
using TeamManager.PeopleService.Data;
using TeamManager.PeopleService.Services;
using TeamManager.Shared.Authentication;
using TeamManager.Shared.Messaging;

namespace TeamManager.PeopleService
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
            services.AddDbContext<PeopleServiceContext>(opt => opt.UseSqlServer(Configuration.GetConnectionString("TeamManager")));
            services.AddCors();
            services.AddRazorPages().AddNewtonsoftJson();
            services.AddControllers(config =>
            {
                var policy = new AuthorizationPolicyBuilder()
                                .RequireAuthenticatedUser()
                                .Build();
                config.Filters.Add(new AuthorizeFilter(policy));
            });

            services.Add(new ServiceDescriptor(typeof(IPeopleService), typeof(TeamManager.PeopleService.Services.PeopleService), ServiceLifetime.Transient));
            services.Add(new ServiceDescriptor(typeof(IUserService), typeof(TeamManager.PeopleService.Services.UserService), ServiceLifetime.Transient));
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddSingleton<IConnectionFactory>(sp =>
            {
                return new ConnectionFactory() { HostName = "servicebus" };
            });

            services.AddSingleton(typeof(IServiceBus), typeof(RabbitMQClient));

            services.AddAzureAuthentication();
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
        }
    }
}
