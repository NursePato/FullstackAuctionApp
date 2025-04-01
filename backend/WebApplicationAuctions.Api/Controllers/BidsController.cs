using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WebApplicationAuctions.Core.Interfaces;

namespace WebApplicationAuctions.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] //Längst upp?
    public class BidsController : ControllerBase
    {
        private readonly IBidsService bidsService;

        public BidsController(IBidsService bidsService)
        {
            this.bidsService = bidsService;
        }

        //Post

        [HttpPost("/api/MakeBid")]
        public IActionResult MakeBid(int auctionID,int amount)
        {
            var userIdstring = User.FindFirstValue("UserID");
            if (userIdstring == null) return BadRequest(new { error = "UserID could not be found in token" });
            var useridint = int.Parse(userIdstring);

            var result = bidsService.MakeBid(useridint,auctionID,amount);
           

            if (result)
            {
                return Ok(new {succes=true,message="Succesful bid! good luck!",time=DateTime.Now});
            }
            else
            {
                return BadRequest(new { succes = false, message = "Either your bid was too low or the auction has expired", time = DateTime.Now });
            }
        }

        //Delete

        [HttpDelete("/api/RemoveBid")]
        public IActionResult RemoveBid(int bidID)
        {
            var userIdstring = User.FindFirstValue("UserID");
            if (userIdstring == null) return BadRequest(new { error = "UserID could not be found in token" });
            var useridint = int.Parse(userIdstring);
            var result = bidsService.RemoveBid(useridint,bidID);

            if (result)
            {
                return Ok(new { succes = true, message = "Succefully removed bid!", time = DateTime.Now });
            }
            else
            {
                return BadRequest(new { succes = false, message = "Failed to remove bid", time = DateTime.Now });
            }
          
        }

        //Get

        [HttpGet("ViewAUsersBids")]
        public IActionResult ViewAUsersBids(int userId)
        {
            var result = bidsService.ViewAllBidsWithID(userId);
            if (result == null)
            {
                return BadRequest(new { message = "No bids found", result = result });
            }
            return Ok(result);
        }

        [HttpGet("GetMyBids")]
        public IActionResult GetMyBids()
        {
            var userIdstring = User.FindFirstValue("UserID");
            if (userIdstring == null) return BadRequest(new { error = "UserID could not be found in token" });
            var useridint = int.Parse(userIdstring);

            var result = bidsService.ViewAllBidsWithID(useridint);

            if (result == null)
            {
                return BadRequest(new { message = "No bids found", result = result });
            }
            return Ok(result);


        }

        [AllowAnonymous]
        [HttpGet("ViewBidsOnAuction")]
        public IActionResult ViewBidsOnAuction(int auctionID)
        {
            var result = bidsService.ViewBidsOnAuction(auctionID);
            if (result == null)
            {
                return BadRequest(new { message = "No bids found", result = result });
            }
            else
            {
                return Ok(result);
            }
        }
    }
}
