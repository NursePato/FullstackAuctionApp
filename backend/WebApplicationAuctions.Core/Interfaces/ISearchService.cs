using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApplicationAuctions.Core.Interfaces
{
    public interface ISearchService
    {
        Task<List<object>> SearchAuctionByIdAsync(int auctionId);
    }
}
