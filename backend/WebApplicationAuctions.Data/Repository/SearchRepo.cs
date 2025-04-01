using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApplicationAuctions.Data.Dto;
using WebApplicationAuctions.Data.Interfaces;
using WebApplicationAuctions.Domain.DomainModels;

namespace WebApplicationAuctions.Data.Repository
{
    public class SearchRepo : ISearchRepo
    {
        private readonly IAuctionsContext _context;

        public SearchRepo(IAuctionsContext context)
        {
            _context = context;
        }


        
        public IEnumerable<SearchDto> SearchAuctions(string keyword)
        {
            using (IDbConnection db = _context.GetConnection())
            {
                db.Open();
                return db.Query<SearchDto>("SearchAuction", new { Keyword = keyword }, commandType: CommandType.StoredProcedure);
            }
        }

        public Task<IEnumerable<SearchDto>> SearchAuctionById(int id)
        {
            using (IDbConnection db = _context.GetConnection())
            {
                db.Open();
                return db.QueryAsync<SearchDto>("SearchAuctionById", new { AuctionId = id });
            }
        }
    }
}
