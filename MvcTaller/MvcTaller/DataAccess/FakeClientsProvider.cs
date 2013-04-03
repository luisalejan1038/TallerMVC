using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MvcTaller.Models;

namespace MvcTaller.DataAccess
{
    public class FakeClientsProvider: IClientsProvider
    {
        static List<Client> listaCliente = new List<Client>();

        public List<Models.Client> GetClients()
        {
            if (listaCliente.Count == 0){
                for (var i = 0; i < 200; i++)
                {
                    Client cliente;
                    cliente = new Client { id = "" + i, name = "Cliente " + i, email = "Cliente" + i + "@email.com", tel = "123-456-789", descripcion = "Comprometido y responsable" };
                    listaCliente.Add(cliente);
                }
            }

            return listaCliente;
        }

        public void AddClient(Client cliente)
        {
 	        throw new NotImplementedException();
        }

        public void RemoveClient(int idCliente)
        {
 	        throw new NotImplementedException();
        }
    }
}

