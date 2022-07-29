using Microsoft.VisualStudio.TestTools.UnitTesting;
using NSubstitute;
using QuranRecitation.Data.Model;
using QuranRecitation.Data.Repositories;
using QuranRecitation.Data.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuranRecitation.Tests.Services
{
    [TestClass]
    public class MessagesServiceTests
    {
        [DataTestMethod]
        [DataRow("68636623-2621-4230-b056-b924ed44b3c6", "299b9dad-390e-402a-a4ea-b061c9f20f27", true)]
        [DataRow("92a253e7-6456-4ba5-a270-2edd532a0986", "d00c510f-500f-4735-8f08-5b363f21aa18", false)]
        public void Test(string receiver, string sender, bool ok)
        {
            //Arrange
            var listMessages = new List<Message>();
            listMessages.Add(new Message() { ReceiverId = "68636623-2621-4230-b056-b924ed44b3c6", SenderId = new Guid("299b9dad-390e-402a-a4ea-b061c9f20f27"), MessageBody = "message1" });
            listMessages.Add(new Message() { ReceiverId = "98183bcd-eccd-49b3-ba67-5e5825a195cb", SenderId = new Guid("d00c510f-500f-4735-8f08-5b363f21aa18"), MessageBody = "message2" });
            IMessageRepository mockedRepository = Substitute.For<IMessageRepository>();
            mockedRepository.GetAll().Returns(listMessages.AsQueryable());

            //Act
            var messageService = new MessageService(mockedRepository);
            var result = messageService.GetPrivateConversation(new Guid(receiver), new Guid(sender));

            //Assert
            if (ok)
                Assert.IsTrue(result.Count() > 0 );
            else
                Assert.AreEqual(result.Count(), 0);
            //ok ? : Assert.Are
        }

        [TestMethod]
        public void Given_Two_User_Id_When_There_Is_A_Private_Conversation_Then_Return_It()
        {
            //Arrange
            var listMessages = new List<Message>();
            var senderId = Guid.NewGuid();
            var receiverId = Guid.NewGuid();
            listMessages.Add(new Message() { ReceiverId = receiverId.ToString(), SenderId = senderId, MessageBody = "message1" });
            listMessages.Add(new Message() { ReceiverId = receiverId.ToString(), SenderId = senderId, MessageBody = "message2" });
            listMessages.Add(new Message() { ReceiverId = receiverId.ToString(), SenderId = senderId, MessageBody = "message3" });
            listMessages.Add(new Message() { ReceiverId = Guid.NewGuid().ToString(), SenderId = senderId, MessageBody = "message4" });

            IMessageRepository mockedRepository = Substitute.For<IMessageRepository>();
            mockedRepository.GetAll().Returns(listMessages.AsQueryable());
              
            //Act
             var messageService = new MessageService(mockedRepository);
             var result = messageService.GetPrivateConversation(receiverId, senderId);

            //Assert
            Assert.IsNotNull(result);
            Assert.AreEqual(result.Count(), 3);
        }

       // [TestMethod]
        public void Given_Two_User_Id_When_There_Is_A_Private_Conversation_Then_Return_All_Messages()
        {
            //Given
            // IMessageRepository =  new MessageR<epositoryMocked();
            //co,figuration ....... 10

            //When
            //MessageService = new MessageService();
            //var result = messageService.GetPrivateConversation(1, 2);

            //Then
            Assert.AreEqual(10, 1);

        }

        [TestMethod]
        public void Given_Two_User_Id_When_There_Is_No_Conversation_Then_Zero_Messages()
        {
            //Arrange
            var listMessages = new List<Message>();
            var senderId = Guid.NewGuid();
            var receiverId = Guid.NewGuid();
            listMessages.Add(new Message() { ReceiverId = receiverId.ToString(), SenderId = senderId, MessageBody = "message1" });
            listMessages.Add(new Message() { ReceiverId = receiverId.ToString(), SenderId = senderId, MessageBody = "message2" });
            listMessages.Add(new Message() { ReceiverId = receiverId.ToString(), SenderId = senderId, MessageBody = "message3" });
            listMessages.Add(new Message() { ReceiverId = Guid.NewGuid().ToString(), SenderId = senderId, MessageBody = "message4" });

            IMessageRepository mockedRepository = Substitute.For<IMessageRepository>();
            mockedRepository.GetAll().Returns(listMessages.AsQueryable());

            //Act
            var messageService = new MessageService(mockedRepository);
            var result = messageService.GetPrivateConversation(Guid.NewGuid(), Guid.NewGuid());

            //Assert
            Assert.AreEqual(result.Count() , 0);
        }

    }
}
