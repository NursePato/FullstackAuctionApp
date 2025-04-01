using Moq;
using WebApplicationAuctions.Core.Services;
using WebApplicationAuctions.Data.Interfaces;

namespace AuctionServiceTests
{
    public class AuctionServiceTests
    {
        [Fact] //Test 1 för att kontrollera att det lyckas med att ta bort en auktion om det inte finns några bud
        public async Task DeleteAuction_ShouldSucceed_WhenNoBidsExist()
        {
            //arrange
            var mockRepo = new Mock<IAuctionRepo>();
            var auctionService = new AuctionService(mockRepo.Object);

            int auctionId = 1;

            //mockar repometoden för att simulera att auktionen kan tas bort om den ej har några bud
            mockRepo.Setup(repo => repo.DeleteAuction(auctionId))
                .ReturnsAsync((true, "Auction successfully deleted"));

            //act
            var result = await auctionService.DeleteAuction(auctionId);

            //assert
            Assert.True(result.Success);
            Assert.Equal("Auction successfully deleted", result.Message);
            mockRepo.Verify(repo => repo.DeleteAuction(auctionId), Times.Once);
        }

        //test 2 för att kontrollera att en auktion EJ kan tas bort om det FINNS bud

        [Fact]
        public async Task DeleteAuction_ShouldFail_WhenBidsExist()
        {
            //arrange
            var mockRepo = new Mock<IAuctionRepo>();
            var auctionService = new AuctionService(mockRepo.Object);

            int auctionId = 2;

            //mocka repometoden för att simulera att auktionen inte kan tas bort om det finns bud på den

            mockRepo.Setup(repo => repo.DeleteAuction(auctionId))
                .ReturnsAsync((false, "Cannot delete auction when bids exist"));

            //act
            var result = await auctionService.DeleteAuction(auctionId);
            Assert.False(result.Success); //kontrollerar att operationen misslyckas
            Assert.Equal("Cannot delete auction when bids exist", result.Message);
            mockRepo.Verify(repo => repo.DeleteAuction(auctionId), Times.Once);

        }
    }
}