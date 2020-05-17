using System;
using System.Text;
using System.Threading.Tasks;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace TeamManager.Shared.Messaging
{
    public class RabbitMQClient : IServiceBus
    {
        private IConnectionFactory _connectionFactory;
        private const string ExchangeName = "TeamManagerExchange";

        public RabbitMQClient(IConnectionFactory connectionFactory)
        {
            this._connectionFactory = connectionFactory;
        }
        public void PublishMessage(string queue, string message)
        {
            using (var connection = this._connectionFactory.CreateConnection())
            {
                using (var model = connection.CreateModel())
                {
                    model.ExchangeDeclare(ExchangeName, "topic");
                    model.QueueDeclare(queue, true, false, false, null);
                    model.QueueBind(queue, ExchangeName, queue);

                    var body = Encoding.UTF8.GetBytes(message);
                    model.BasicPublish(ExchangeName, queue, null, body);
                }
            }
        }

        public void SubscribeForQueue(string queue, Func<string, Task> action)
        {
            var connection = this._connectionFactory.CreateConnection();

            var model = connection.CreateModel();
            model.ExchangeDeclare(ExchangeName, "topic");
            model.QueueDeclare(queue, true, false, false, null);
            model.QueueBind(queue, ExchangeName, queue);

            var consumer = new EventingBasicConsumer(model);
            consumer.Received += (object sender, BasicDeliverEventArgs @eventArgs) =>
            {
                var message = Encoding.UTF8.GetString(@eventArgs.Body.ToArray());
                action(message);
            };

            model.CallbackException += (o, s) =>
            {
                action(s.ToString());
            };

            model.BasicConsume(queue, true, consumer);
        }
    }
}