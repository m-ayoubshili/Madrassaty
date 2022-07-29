using System;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;

namespace QuranRecitation.WebApi.HubConfig
{
    public class HubConfig :Hub
    {

        public override Task OnConnected()
        {
            Clients.Caller.EstablishedConnection();
            return base.OnConnected();
        }
        public override Task OnDisconnected(bool stopCalled)
        {
            //NotifyWatching("1B236DE2-A29E-41F6-98ED-21B9065C62B9");
            Clients.Caller.ViewCountUpdate(Context.ConnectionId+"LEFT|DISCONNECTED");
            return base.OnDisconnected(stopCalled);
        }
        public async Task DeliverMessage(Object msg,string destinationConnectionId)
        {
            await Clients.Client(destinationConnectionId).MessageRecived(msg);
            //await Clients.Others.MessageRecived(messageBody,UserId,id);
        }
        public Task JoinGroup(string nom,string id)
        {
            return Groups.Add(id, nom);
        }
        public Task LeaveGroup(string nom,string CID)
        {
            return Groups.Remove(CID, nom);
        }
        public async Task DeliverToGroup(Object msg, string groupName)
        {
            await Clients.OthersInGroup(groupName).MessageRecivedGroup(msg);
            //await ClientOthersIns.Others.MessageRMessageRecivedGroupecived(messageBody,UserId,id);
        }
    }
}
