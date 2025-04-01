using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApplicationAuctions.Data.Dto;
using WebApplicationAuctions.Data.Repository;
using WebApplicationAuctions.Domain.DomainModels;

namespace WebApplicationAuctions.Data.Interfaces
{
    public interface ISearchRepo
    {
        public IEnumerable<SearchDto> SearchAuctions(string keyword);
        Task<IEnumerable<SearchDto>> SearchAuctionById(int id);
    }
}
