using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.AzureAD.UI;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using TeamManager.PeopleService.Data;
using TeamManager.PeopleService.Services;
using TeamManager.Shared.Authenticaiton;

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
                // using Microsoft.AspNetCore.Mvc.Authorization;
                // using Microsoft.AspNetCore.Authorization;
                var policy = new AuthorizationPolicyBuilder()
                                .RequireAuthenticatedUser()
                                .Build();
                config.Filters.Add(new AuthorizeFilter(policy));
            });
            
            services.Add(new ServiceDescriptor(typeof(IPeopleService), typeof(TeamManager.PeopleService.Services.PeopleService), ServiceLifetime.Transient));
            services.Add(new ServiceDescriptor(typeof(IUserService), typeof(TeamManager.PeopleService.Services.UserService), ServiceLifetime.Transient));
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = AzureADDefaults.JwtBearerAuthenticationScheme;
                options.DefaultChallengeScheme = AzureADDefaults.JwtBearerAuthenticationScheme;
            }).AddAzureADBearer(options =>
            {
                options.Instance = "https://login.microsoftonline.com/";
                options.ClientId = "7f691190-b6d4-42f9-996f-21c64aa7d1ad";
                options.TenantId = "common";
            });

            services.Configure<JwtBearerOptions>(AzureADDefaults.JwtBearerAuthenticationScheme, options =>
            {
                // This is a Microsoft identity platform web API.
                options.Authority += "/v2.0";

                // The web API accepts as audiences both the Client ID (options.Audience) and api://{ClientID}.
                options.TokenValidationParameters.ValidAudiences = new[]
                {
                options.Audience,
                $"api://{options.Audience}"
                };

                // Instead of using the default validation (validating against a single tenant,
                // as we do in line-of-business apps),
                // we inject our own multitenant validation logic (which even accepts both v1 and v2 tokens).
                options.TokenValidationParameters.IssuerValidator = AadIssuerValidator.GetIssuerValidator(options.Authority).Validate; ;
            });
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
