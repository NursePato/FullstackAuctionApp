using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApplicationAuctions.Domain.DomainModels;

namespace WebApplicationAuctions.Core.Interfaces
{
    public interface IBidsService
    {
        bool MakeBid(int userID, int auctionID, int amount);

        bool RemoveBid(int userID, int bidID);

        List<Bid> ViewAllBidsWithID(int userID);

        List<Bid> ViewBidsOnAuction(int auctionID);
    }
}
