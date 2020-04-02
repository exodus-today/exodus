using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Sockets;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using WebSocketSharp;
using WebSocketSharp.Server;

namespace SoketIO
{
    public class Fox : WebSocketBehavior
    {
        private string SessionID { get { return this.ID; } }

        protected override void OnMessage(MessageEventArgs e)
        {
            Console.WriteLine(e.Data);
            Sessions.Broadcast(e.Data);
        }

        protected override void OnOpen()
        {
            Console.WriteLine("Connect: " + SessionID);
            base.OnOpen();
        }

        protected override void OnClose(CloseEventArgs e)
        {
            Console.WriteLine("Disconnect: " + SessionID);
            base.OnClose(e);
        }

        protected override void OnError(ErrorEventArgs e)
        {
            base.OnError(e);
        }
    }


    class Program
    {
        static void Main(string[] args)
        {
            WebSocketServer server = new WebSocketServer(IPAddress.Any, 80);
            server.AddWebSocketService<Fox>("/ws");
            server.Start();
            Console.ReadKey(true);
            server.Stop();
        }
    }
}
