using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApplicationAuctions.Domain.DomainModels;

namespace WebApplicationAuctions.Data.Interfaces
{
    public interface IUserRepo
    {
        public Users RegisterUser(string username, string userpassword);
        
        public void UpdateUsers(Users users);
        public List<Users> GetAllUsers();

        public Users Login(string username, string password);
    }
}
