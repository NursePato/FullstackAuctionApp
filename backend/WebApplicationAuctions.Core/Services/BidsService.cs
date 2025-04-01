using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApplicationAuctions.Core.Interfaces;
using WebApplicationAuctions.Data.Interfaces;
using WebApplicationAuctions.Domain.DomainModels;

namespace WebApplicationAuctions.Core.Services
{
    public class BidsService:IBidsService
    {
        private readonly IBidsRepo repo;
        
        public BidsService(IBidsRepo repo)
        {
            this.repo = repo;
        }

        public bool MakeBid(int userID, int auctionID, int amount)
        {
            var result = repo.MakeBid(userID, auctionID, amount);
            return result;
        }

        public bool RemoveBid(int userID, int bidID)
        {
            var result = repo.RemoveBid(userID, bidID);
            return result;
        }

        public List<Bid> ViewAllBidsWithID(int userID)
        {
            var result = repo.ViewAllBidsWithID(userID);
            return result;
        }

        public List<Bid> ViewBidsOnAuction(int auctionID)
        {
            var result = repo.ViewBidsOnAuction(auctionID);
            return result;
        }
    }
}
