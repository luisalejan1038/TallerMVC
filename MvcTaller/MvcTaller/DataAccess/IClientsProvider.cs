using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MvcTaller.Models;

namespace MvcTaller.DataAccess
{
    interface IClientsProvider
    {
        List<Client> GetClients();
        void AddClient(Client cliente);
        void RemoveClient(int idCliente); 
    }
}
