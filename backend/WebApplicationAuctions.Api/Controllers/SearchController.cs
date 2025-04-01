using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using WebApplicationAuctions.Core.Interfaces;
using WebApplicationAuctions.Core.Services;
using WebApplicationAuctions.Data.Interfaces;

namespace WebApplicationAuctions.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly ISearchRepo _searchRepo;
        private readonly ISearchService _searchService;

        public SearchController(ISearchRepo searchRepo, ISearchService searchService)
        {
            _searchRepo = searchRepo;
            _searchService = searchService;
        }

        [HttpGet]
        [Route("/api/Search-Auctions")]
        public IActionResult SearchAuctions(string keyword)
        {
            var search = _searchRepo.SearchAuctions(keyword);
            return Ok(search);
        }
        [HttpGet]
        [Route("/api/SearchAuctionById/{auctionId}")]
        public async Task<IActionResult> SearchAuctionById(int auctionId)
        {
            try
            {
                var results = await _searchService.SearchAuctionByIdAsync(auctionId);

                if (results.Count == 0)
                {
                    return NotFound($"No auction found with ID: {auctionId}.");
                }

                return Ok(results);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
