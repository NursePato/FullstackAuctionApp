using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApplicationAuctions.Core.Dtos;
using WebApplicationAuctions.Core.Interfaces;
using WebApplicationAuctions.Data.Interfaces;
using WebApplicationAuctions.Domain.DomainModels;

namespace WebApplicationAuctions.Core.Services
{
    public class AuctionService : IAuctionService
    {
        private readonly IAuctionRepo _repo;

        public AuctionService(IAuctionRepo repo)
        {
            _repo = repo;
        }

        public async Task<int> CreateAuction(CreateAuctionDto auctionDto, int userId)
        {
            //här valideras att slutdatum är senare än startdatum
            if (auctionDto.ClosingTime <= auctionDto.OpeningTime)
            {
                throw new ArgumentException("Closing time have to be later than starting time");
            }

            var auction = new Auction
            {
                AuctionName = auctionDto.AuctionName,
                AuctionDescription = auctionDto.AuctionDescription,
                StartingPrice = auctionDto.StartingPrice,
                OpeningTime = auctionDto.OpeningTime,
                ClosingTime = auctionDto.ClosingTime,
                UserId = userId
            };

            return await _repo.CreateAuction(auction);
        }

        public async Task<(bool Success, string Message)> DeleteAuction(int auctionId)
        {
            if (auctionId <= 0)
            {
                throw new ArgumentException("Invalid Auction ID");
            }
            
            return await _repo.DeleteAuction(auctionId);
        }

        public bool UpdateAuction(UpdateAuctionDTO DTO,int userid)
        {
            var result = _repo.UpdateAuction(DTO.AuctionID,DTO.AuctionName,DTO.AuctionDescription,
                DTO.ClosingTime,DTO.StartingPrice,userid);

            return result == 1;
        }

        
    }
}
