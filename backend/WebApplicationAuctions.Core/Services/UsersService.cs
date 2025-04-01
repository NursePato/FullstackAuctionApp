using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebApplicationAuctions.Core.Interfaces;
using WebApplicationAuctions.Data.Interfaces;
using WebApplicationAuctions.Domain.DomainModels;

namespace WebApplicationAuctions.Core.Services
{
    public class UsersService : IUsersServiceInterface
    {
        private readonly IUserRepo _repo; //rename to repo IUsersRepo(works as example)
        public UsersService(IUserRepo repo)
        {
            _repo = repo;
        }

        public string Login(string username, string password)
        {
            var loginresult = _repo.Login(username, password);
            if (loginresult == null)
            {
                return null;
            }
            else
            {
                var ourtoken = MakeToken(loginresult);
                return ourtoken;
            }
        }

        private string MakeToken(Users users) //move to the bottom eventually
        {
            var securitykey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("OurSuperSecretKeyForOurApi123456789hushhush"));
            var credentials = new SigningCredentials(securitykey, SecurityAlgorithms.HmacSha256);

            List<Claim> claims = new List<Claim>()
            {
                new Claim("UserID",users.UserId.ToString()),
                new Claim("Username",users.UserName)

            };

            //Admin?? if we have admin comment away and choose username for admin.

            /*if(users.UserName == "Admin")
             {
                 claims.Add(new Claim(ClaimTypes.Role, "Admin"));
             }

            else
             {
                 claims.Add(new Claim(ClaimTypes.Role, "User"));
             }*/

            var token = new JwtSecurityToken(
                issuer: "http://localhost:5120",
                audience: "http://localhost:5120",
                claims: claims,
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);


        }

        public Users RegisterUser(string username, string userpassword)
        {
            var result = _repo.RegisterUser(username, userpassword);
            return result;
        }

        public void UpdateUsers(Users users)
        {
            _repo.UpdateUsers(users);
        }
        public List<Users> GetAllUsers()
        { 
            return _repo.GetAllUsers();
        }


    }
}
