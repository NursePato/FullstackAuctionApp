using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApplicationAuctions.Data.Interfaces;
using WebApplicationAuctions.Domain.DomainModels;

namespace WebApplicationAuctions.Data.Repository
{
    public class BidsRepo : IBidsRepo
    {
        private readonly IAuctionsContext context;
        public BidsRepo(IAuctionsContext context)
        {
            this.context = context;
        }

        public bool MakeBid(int userID, int auctionID, int amount)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@UserID", userID);
            parameters.Add("@AuctionID", auctionID);
            parameters.Add("@Amount", amount);

            using(IDbConnection db = context.GetConnection())
            {
                db.Open();
                var result = db.QuerySingle<int>("MakeBid", parameters, commandType: CommandType.StoredProcedure);
                return result == 1;
            }
        }

        public bool RemoveBid(int userID, int bidID)
        {

            var parameters = new DynamicParameters();
            parameters.Add("@UserID", userID);
            parameters.Add("@BidID", bidID);

            using(IDbConnection db = context.GetConnection())
            {
                db.Open();
                var result = db.QuerySingle<int>("RemoveBid",parameters,commandType: CommandType.StoredProcedure);
                return result == 1;
            }

        }

        public List<Bid> ViewAllBidsWithID(int userID)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@UserID", userID);

            using (IDbConnection db = context.GetConnection())
            {
                db.Open();
                var result = db.Query<Bid>("ViewAllBidsWithID",parameters,commandType: CommandType.StoredProcedure);
                db.Close();
                return result.ToList();
            }

        }

        public List<Bid> ViewBidsOnAuction(int auctionID)
        {
            var parameters = new DynamicParameters();
            parameters.Add("@AuctionID", auctionID);

            using(IDbConnection db =context.GetConnection())
            {
                db.Open();

                var result = db.Query<Bid>("ViewBidsOnAuction", parameters, commandType: CommandType.StoredProcedure);
                db.Close();
                return result.ToList();
            }

        }





    }
}
