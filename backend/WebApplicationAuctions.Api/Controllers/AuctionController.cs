using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WebApplicationAuctions.Core.Dtos;
using WebApplicationAuctions.Core.Interfaces;

namespace WebApplicationAuctions.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    //Auction should eventually have only 1 controler with all HTTP methods inside it.
    public class AuctionController : ControllerBase
    {
        private readonly IAuctionService _service;

        public AuctionController(IAuctionService service)
        {
            _service = service;
        }

        //[HttpPost("Create-Auction")]
        //public async Task<IActionResult> CreateAuction([FromBody] CreateAuctionDto auctionDto)
        //{
        //    try
        //    {
        //        //hämta userid från jwt-token 
        //        //var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

        //        var userIdstring = User.FindFirstValue("UserID");
        //        var useridint = int.Parse(userIdstring);

        //        //anropar serviceklassen för att skapa auktionen
        //        var newAuctionId = await _service.CreateAuction(auctionDto, useridint);

        //        return Ok(new { Message = "Auction created successfully", AuctionId = newAuctionId });
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(new { Error = ex.Message });
        //    }
        //}


        [HttpDelete("{auctionId}")]
        public async Task<IActionResult> DeleteAuction(int auctionId)
        {
            //här används alias i stored proceduren för att visa success eller failure med 
            //att radera en auktion. om auktionen har bud så misslyckas raderningen och visar en 0:a
            try
            {
                var result = await _service.DeleteAuction(auctionId);

                if (result.Success)
                    return Ok(new { Message = result.Message });

                else return BadRequest(new { Error = result.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = ex.Message });
            }
        }

        [HttpPut("UpdateAuction")]
        public IActionResult UpdateAuction([FromBody] UpdateAuctionDTO auctionDto)
        {
            var userIdstring = User.FindFirstValue("UserID");
            var useridint = int.Parse(userIdstring);

            var result = _service.UpdateAuction(auctionDto,useridint);
            if (result)
            {
                return Ok(new { Success = true, message = "Auction updated!" });
            }
            else
            {
                return BadRequest(new { success = false, message = "Auction not updated!" });
            }
        }



    }
}
