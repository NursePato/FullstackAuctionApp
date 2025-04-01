using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApplicationAuctions.Core.Interfaces;
using WebApplicationAuctions.Data.Interfaces;

namespace WebApplicationAuctions.Core.Services
{
    public class SearchService : ISearchService
    {
        private readonly IAuctionsContext _context;

        public SearchService(IAuctionsContext context)
        {
            _context = context;
        }

        public async Task<List<object>> SearchAuctionByIdAsync(int auctionId)
        {
            var results = new List<object>();

            using (var db = _context.GetConnection())
            {
                await db.OpenAsync();

                using (var command = new SqlCommand("SearchAuctionById_new", db))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.Parameters.AddWithValue("@AuctionId", auctionId);

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            results.Add(new
                            {
                                Message = reader["Message"]?.ToString(),
                                AuctionId = reader["AuctionId"] != DBNull.Value ? (int?)reader["AuctionId"] : null,
                                AuctionName = reader["AuctionName"]?.ToString(),
                                AuctionDescription = reader["AuctionDescription"]?.ToString(),
                                StartingPrice = reader["StartingPrice"] != DBNull.Value
                                    ? Convert.ToDecimal(reader["StartingPrice"])
                                    : (decimal?)null,
                                //StartingPrice = reader["StartingPrice"] != DBNull.Value ? (decimal?)reader["StartingPrice"] : null,
                                ClosingTime = reader["ClosingTime"] != DBNull.Value ? (DateTime?)reader["ClosingTime"] : null,
                               // BidId = reader["BidId"] != DBNull.Value ? (int?)reader["BidId"] : null,
                                BidId = reader["BidId"] != DBNull.Value ? Convert.ToInt32(reader["BidId"]) : (int?)null,

                                BidAmount = reader["BidAmount"] != DBNull.Value ? Convert.ToDecimal(reader["BidAmount"]) : (decimal?)null,
                                //BidAmount = reader["BidAmount"] != DBNull.Value ? (decimal?)reader["BidAmount"] : null,
                                BidTime = reader["BidTime"] != DBNull.Value ? (DateTime?)reader["BidTime"] : null,
                                UserId = reader["UserId"] != DBNull.Value ? (int?)reader["UserId"] : null,
                                Username = reader["Username"]?.ToString()
                            });
                        }
                    }
                }
            }

            return results;
        }
    }
}
