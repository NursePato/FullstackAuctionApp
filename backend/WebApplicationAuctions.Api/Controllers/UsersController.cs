using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplicationAuctions.Core.Interfaces;
using WebApplicationAuctions.Data.Interfaces;
using WebApplicationAuctions.Domain.DomainModels;

namespace WebApplicationAuctions.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        
        private readonly IUsersServiceInterface service;

        public UsersController(IUsersServiceInterface usersService) //Only service
        {
            
            service = usersService;
        }


       //POST:

       [HttpPost]
       [Route("/api/registerUser")]
        public  IActionResult RegisterUser(string username, string userpassword)
        {
            service.RegisterUser(username, userpassword);
            
            return Ok("User registere successfully");
        }

        //Get:
        [HttpGet]
        [Route("/api/GetAllUsers")]
        public IActionResult GetAllUsers()
        {
            var result = service.GetAllUsers();
            return Ok(result);
        }

        //PUT:

        [HttpPost]
        [Route("/api/UpdateUser")]
        public IActionResult Updateusers(Users users)
        {
            service.UpdateUsers(users);
            
            return Ok("User updated successfully");
        }

        //DELETE:

        

        [HttpGet("/api/Login")]
        
        public IActionResult Login(string username,string password)
        {
            var result = service.Login(username, password);
            if(result == null)
            {
                return NotFound(); //testing this usually use badrequest

            }
            else
            {
                return Ok(new { token = result });
            }
        }
       
    }
}
