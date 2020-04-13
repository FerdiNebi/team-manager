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
            return this.httpContextAccessor.HttpContext.Request.Headers["USER_ID"].ToString();
        }
    }
}