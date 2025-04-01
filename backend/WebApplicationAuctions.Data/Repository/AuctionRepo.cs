using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Microsoft.Identity.Client;
using WebApplicationAuctions.Data.Interfaces;
using WebApplicationAuctions.Domain.DomainModels;

namespace WebApplicationAuctions.Data.Repository
{
    public class AuctionRepo : IAuctionRepo
    {
        private readonly IAuctionsContext _context;

        public AuctionRepo (IAuctionsContext context)
        {
            _context = context;
        }

        public async Task<int> CreateAuction(Auction auction)
        {
            using (var connection = _context.GetConnection())
            {
                var parameters = new DynamicParameters();
                parameters.Add("@AuctionName", auction.AuctionName);
                parameters.Add("@AuctionDescription", auction.AuctionDescription);
                parameters.Add("@StartingPrice", auction.StartingPrice);
                parameters.Add("@OpeningTime", auction.OpeningTime);
                parameters.Add("@ClosingTime", auction.ClosingTime);
                parameters.Add("@UserId", auction.UserId);

                var storedProcedure = "CreateAuction";

                await connection.OpenAsync();
                var newAuctionId = await connection.ExecuteScalarAsync<int>(
                    storedProcedure,
                    parameters,
                    commandType: CommandType.StoredProcedure);
                await connection.CloseAsync();

                return newAuctionId; //returnerar id för den nya skapade auktionen


            }
        }

        public async Task<(bool Success, string Message)> DeleteAuction(int auctionId)
        {
            using (var connection = _context.GetConnection())
            {
                var parameters = new DynamicParameters();
                parameters.Add("@AuctionId", auctionId);

                var storedProcedure = "DeleteAuctionIfNoBids";

                await connection.OpenAsync();
                var result = await connection.QueryFirstOrDefaultAsync<(bool Success, string Message)>
                (
                    storedProcedure,
                    parameters,
                    commandType: CommandType.StoredProcedure
                );
                await connection.CloseAsync();

                return result;
            }
        }

        public int UpdateAuction(int? auctionid,string? auctionname,string? auctiondescription,DateTime? closingtime,decimal? startingprice,int userid)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@AuctionName", auctionname);
            parameters.Add("@ClosingTime", closingtime);
            parameters.Add("@AuctionDescription", auctiondescription);
            parameters.Add("@StartingPrice",startingprice);
            parameters.Add("@AuctionId",auctionid);
            parameters.Add("@UserID", userid);

            using (var db = _context.GetConnection())
            {
                db.Open();

                var result = db.QuerySingle<int>("UpdateAuction_new", parameters,commandType:CommandType.StoredProcedure);
                db.Close();
                return result;
               
                    
            }


        }
    }
}
