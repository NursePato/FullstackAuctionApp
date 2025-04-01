using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApplicationAuctions.Domain.DomainModels;

namespace WebApplicationAuctions.Core.Interfaces
{
    public interface IUsersServiceInterface
    {
        public string Login(string username, string password);
        public Users RegisterUser(string username, string userpassword);
        public void UpdateUsers(Users users);
        public List<Users> GetAllUsers();
    }
}
