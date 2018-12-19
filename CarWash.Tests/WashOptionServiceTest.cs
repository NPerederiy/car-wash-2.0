using CarWash.Models;
using CarWash.Models.Interfaces;
using CarWash.Services;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Tests
{
    public class WashOptionServiceTest
    {
        [SetUp]
        public void Setup()
        {
            var mock = new Mock<IUnitOfWork>();
            mock.Setup(uow => uow.WashServiceRepository.GetAllAsync()).Returns(GetTestOptions());
        }

        [Test]
        public async Task GetWashServicesAsync_ReturnsListOfWashServises()
        {
            // Arrange
            var unitOfWorkMock = new Mock<IUnitOfWork>();
            unitOfWorkMock.Setup(uow => uow.WashServiceRepository.GetAllAsync())
                          .Returns(GetTestOptions());
            var service = new WashOptionService(unitOfWorkMock.Object);
            
            // Act
            var options = await service.GetWashServicesAsync();

            // Assert
            unitOfWorkMock.VerifyAll();
            Assert.IsNotNull(options);
            Assert.AreEqual(3, options.Count());
        }

        [Test]
        [TestCase(1)]
        public async Task GetWashServiceByIdAsync_ReturnsWashOption_IfOptionWithSuchIdExists(int id)
        {
            // Arrange
            var unitOfWorkMock = new Mock<IUnitOfWork>(MockBehavior.Strict);
            unitOfWorkMock.Setup(uow => uow.WashServiceRepository
                        .GetByConditionAsync(It.IsAny<Expression<Func<WashService, bool>>>()))
                        .Returns(GetTestOptions());
            var service = new WashOptionService(unitOfWorkMock.Object);

            // Act
            var option = await service.GetWashServiceByIdAsync(id);

            // Assert
            unitOfWorkMock.VerifyAll();
            Assert.IsNotNull(option);
            Assert.IsInstanceOf(typeof(WashService), option);
        }

        [Test]
        [TestCase(-1)]
        public void GetWashServiceByIdAsync_ThrowsArgumentException_IfArgumentIsLessOrEqualToZero(int id)
        {
            // Arrange
            var unitOfWorkMock = new Mock<IUnitOfWork>(MockBehavior.Strict);
            var service = new WashOptionService(unitOfWorkMock.Object);

            // Act & Assert
            Assert.ThrowsAsync<ArgumentException>(async () => await service.GetWashServiceByIdAsync(id));
        }

        private async Task<IEnumerable<WashService>> GetTestOptions()
        {
            var list = new List<WashService>
            {
                new WashService
                {
                    ServiceId = 1,
                    Name = "Hand Wash",
                    Description = "Hand wash and dry \\nClean windows \\nVacuum interior \\nCleen wheels \\nDress tires \\nWipe down dash",
                    Price = 55,
                    LeadTime = 15
                },
                new WashService
                {
                    ServiceId = 2,
                    Name = "Hand Wash & Wax",
                    Description = "Degrease door jambs \\nHand wax with carnauba paste",
                    Price = 150,
                    LeadTime = 20
                },
                new WashService
                {
                    ServiceId = 3,
                    Name = "Wash Polish & Wax",
                    Description = "Clean and vacuum entire truck \\nShampoo all floor mats \\nProfessionally applied machine \\nPolishing on all painted surfaces",
                    Price = 170,
                    LeadTime = 30
                }
            };
            return list;
        }
    }
}