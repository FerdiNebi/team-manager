using System.Linq;
using Microsoft.AspNetCore.Http;

namespace TeamManager.PeopleService.Services
{
    public class UserService : IUserService
    {
        private IHttpContextAccessor httpContextAccessor;
        
        public UserService(IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor;
        }

        public string GetUserSubject()
        {
            return this.httpContextAccessor.HttpContext.User.Claims.First(c => c.Type == "http://schemas.microsoft.com/identity/claims/objectidentifier").Value;
        }
    }
}