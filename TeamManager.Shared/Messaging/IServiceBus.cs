using System;
using System.Threading.Tasks;

namespace TeamManager.Shared.Messaging
{
    public interface IServiceBus
    {
        void PublishMessage(string queue, string message);

        void SubscribeForQueue(string queue, Func<string, Task> action);
    }
}