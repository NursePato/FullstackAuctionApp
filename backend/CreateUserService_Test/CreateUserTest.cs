using Azure.Identity;
using Moq;
using Xunit;
using WebApplicationAuctions.Core.Services;
using WebApplicationAuctions.Data.Interfaces;
using WebApplicationAuctions.Data.Repository;
using WebApplicationAuctions.Domain.DomainModels;

namespace CreateUserService_Test
{
    public class CreateUserTest 
    {
        //Test för att registrera en användare

        [Fact]
        public void RegisterUser_ShouldReturnSuccess_WhenUserIsCreated()
        {
            //arrange
            var mockUserRepo = new Mock<IUserRepo>();

            var userService = new UsersService(mockUserRepo.Object);

            var username = "testuser";
            var password = "testpassword";

            var expectedUser = new Users
            {
               UserId = 1,
               UserName = username,
               UserPassword = password

            };

            mockUserRepo
                .Setup(repo => repo.RegisterUser(username, password))
                    .Returns(expectedUser); //här mockas repometoden

            //act
            var result = userService.RegisterUser(username, password);

            //assert
            Assert.NotNull(result);
            Assert.Equal(expectedUser.UserId, result.UserId);
            Assert.Equal(expectedUser.UserName, result.UserName);
            mockUserRepo.Verify(repo => repo.RegisterUser(username, password),
                Times.Once);
        }
    }
}