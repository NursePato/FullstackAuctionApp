using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplicationAuctions.Core.Dtos;
using WebApplicationAuctions.Core.Interfaces;

namespace WebApplicationAuctions.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CreateAuctionController : ControllerBase
    {
        private readonly IAuctionService _service;

        public CreateAuctionController(IAuctionService service)
        {
            _service = service;
        }

        [HttpPost("Create-Auction")]
        public async Task<IActionResult> CreateAuction([FromBody] CreateAuctionDto auctionDto)
        {
            try
            {
                //hämta userid från jwt-token 
                //var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

                var userIdstring = User.FindFirstValue("UserID");
                var useridint = int.Parse(userIdstring);

                //anropar serviceklassen för att skapa auktionen
                var newAuctionId = await _service.CreateAuction(auctionDto, useridint);

                return Ok(new { Message = "Auction created successfully", AuctionId = newAuctionId });
            }
            catch (Exception ex)
            {
                return BadRequest(new { Error = ex.Message });
            }
        }

    }
}
