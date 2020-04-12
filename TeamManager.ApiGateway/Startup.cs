using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using TeamManager.ApiGateway.Data;
using Microsoft.AspNetCore.Authentication.AzureAD.UI;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace TeamManager.ApiGateway
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
            services.AddControllers();
            var authenticationProviderKey = "IdentityApiKey";

            // var identityUrl = Configuration.GetValue<string>("IdentityUrl");
            // services.AddAuthentication()
            //     .AddJwtBearer(authenticationProviderKey, x =>
            //     {
            //         x.Authority = identityUrl;
            //         x.RequireHttpsMetadata = false;
            //         x.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters()
            //         {
            //             ValidAudiences = new[] { "people", "feedback"}
            //         };
            //         x.Events = new Microsoft.AspNetCore.Authentication.JwtBearer.JwtBearerEvents()
            //         {
            //             OnAuthenticationFailed = async ctx =>
            //             {
            //                 int i = 0;
            //             },
            //             OnTokenValidated = async ctx =>
            //             {
            //                 int i = 0;
            //             },

            //             OnMessageReceived = async ctx =>
            //             {
            //                 int i = 0;
            //             }
            //         };
            //     });

            services.AddDbContext<ApplicationDbContext>(opt => opt.UseSqlServer(Configuration.GetConnectionString("TeamManager")));

            // services.AddDefaultIdentity<IdentityUser>(options =>
            // {
            //     options.SignIn.RequireConfirmedAccount = false;
            //     options.Password.RequireDigit = false;
            //     options.Password.RequiredLength = 3;
            //     options.Password.RequiredUniqueChars = 1;
            //     options.Password.RequireLowercase = false;
            //     options.Password.RequireNonAlphanumeric = false;
            //     options.Password.RequireUppercase = false;
            // })
            //     .AddEntityFrameworkStores<ApplicationDbContext>();

            // services.AddAuthentication(authenticationProviderKey)
            // .AddMicrosoftAccount(authenticationProviderKey, microsoftOptions =>
            // {
            //     microsoftOptions.ClientId = "7f691190-b6d4-42f9-996f-21c64aa7d1ad";
            //     microsoftOptions.ClientSecret = "4jpP]j3@LoJGz0@/ELNxNf7upy3MbgSg";
            // });

            // services.AddAuthentication(AzureADDefaults.JwtBearerAuthenticationScheme)
            //   .AddAzureADBearer(options => Configuration.Bind("AzureAd", options));

            // services.Configure<JwtBearerOptions>(AzureADDefaults.JwtBearerAuthenticationScheme, options =>
            // {
            //     // This is a Microsoft identity platform web API.
            //     options.Authority += "/v2.0";

            //     // The web API accepts as audiences both the Client ID (options.Audience) and api://{ClientID}.
            //     options.TokenValidationParameters.ValidAudiences = new[]
            //     {
            //         options.Audience,
            //         $"api://{options.Audience}"
            //     };
            // });

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.Authority = "https://login.microsoftonline.com/1e2cf074-7a96-45fd-8bab-6638448666b3/v2.0/";
                options.Audience = "7f691190-b6d4-42f9-996f-21c64aa7d1ad";
            });

            services.AddCors();
            services.AddOcelot(Configuration);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseCors(options =>
                options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
            );

            app.UseOcelot().Wait();
        }
    }
}
