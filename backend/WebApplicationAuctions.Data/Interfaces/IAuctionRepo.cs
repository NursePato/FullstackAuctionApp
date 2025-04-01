using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApplicationAuctions.Domain.DomainModels;

namespace WebApplicationAuctions.Data.Interfaces
{
    public interface IAuctionRepo
    {
        Task<int> CreateAuction(Auction auction);

        Task<(bool Success, string Message)> DeleteAuction(int auctionId);

        int UpdateAuction(int? auctionid, string? auctionname, 
                            string? auctiondescription, DateTime? 
                            closingtime, decimal? startingprice,int userid);
    }
}
