using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApplicationAuctions.Core.Dtos;

namespace WebApplicationAuctions.Core.Interfaces
{
    public interface IAuctionService
    {
        Task<int> CreateAuction(CreateAuctionDto auctionDto, int userId);

        Task<(bool Success, string Message)> DeleteAuction(int auctionId);

        bool UpdateAuction(UpdateAuctionDTO DTO,int userid);

    }
}
