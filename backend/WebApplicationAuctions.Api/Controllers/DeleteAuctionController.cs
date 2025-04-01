using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplicationAuctions.Core.Interfaces;

namespace WebApplicationAuctions.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DeleteAuctionController : ControllerBase
    {
        private readonly IAuctionService _service;

        public DeleteAuctionController(IAuctionService service)
        {
            _service = service;
        }

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
    }
}
