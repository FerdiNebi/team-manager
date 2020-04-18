using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.AzureAD.UI;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;

namespace TeamManager.Shared.Authentication
{
    public static class Extensions
    {
        public static void AddAzureAuthentication(this IServiceCollection services)
        {
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
    }
}