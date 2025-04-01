using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Data.SqlClient;
using WebApplicationAuctions.Data.Interfaces;
using WebApplicationAuctions.Domain.DomainModels;

namespace WebApplicationAuctions.Data.Repository
{
    public class UsersRepo: IUserRepo
    {
        private readonly IAuctionsContext _context;

        public UsersRepo(IAuctionsContext context)
        {
            _context = context;
        }

        public Users RegisterUser(string username, string userpassword)
        {
            
                DynamicParameters parameters = new DynamicParameters();
               
                parameters.Add("@UserName", username);
                parameters.Add("@UserPassword", userpassword);

            using (IDbConnection db = _context.GetConnection())
            {
                    db.Open();
                var result = db.QueryFirstOrDefault<Users>("RegisterUsers", parameters, commandType: CommandType.StoredProcedure);
                db.Close();
                return result;
            }
        }
        
        public void UpdateUsers(Users users)
        {
                DynamicParameters parameters = new DynamicParameters();

                parameters.Add("@UserId", users.UserId);
                parameters.Add("@UserName", users.UserName);
                parameters.Add("@UserPassword", users.UserPassword);


                using (IDbConnection db = _context.GetConnection())
                {
                    db.Open();
                    db.Execute("UpdateUsers", parameters, commandType: CommandType.StoredProcedure);
                }
                                
        }

        public List<Users> GetAllUsers()
        {
            using (IDbConnection db = _context.GetConnection())
            {
                return db.Query<Users>("GetAllUsers",
                    commandType: CommandType.StoredProcedure)
                    .ToList();
            }
        }

        public Users Login (string username, string password)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@Username", username);
            parameters.Add("@Password", password);

            using(IDbConnection db = _context.GetConnection())
            {
                db.Open();
                var result = db.QueryFirstOrDefault<Users>("Login",parameters
                                    ,commandType: CommandType.StoredProcedure);
                db.Close();
                return result;
            }

            //Havent made the stored procedure yet.

        }


    }
}
