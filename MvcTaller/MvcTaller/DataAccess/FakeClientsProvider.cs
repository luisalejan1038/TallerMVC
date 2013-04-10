using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MvcTaller.Models;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Diagnostics;

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

        public void AddClient(Client client)
        {
            using (var db = new ClientContext())
            {
                var cliente = new Client
                {
                    name = "name8",
                    id = "id134",
                    email = "email19",
                    tel = "tel11",
                    descripcion = "descripcion19"
                };

                db.Clients.Add(cliente);
                db.SaveChanges();

                var query = from d in db.Clients
                            select d;

                foreach (Client item in query)
                {
                    Debug.WriteLine(item.name + " " + item.id + " " + item.email + " " + item.tel + " " + item.descripcion + " ");
                }
            }

        }

        public void UpdateClient(Client upclient)
        {
            using (var db = new ClientContext())
            {
                var cliente = db.Clients.Find(upclient.id);
                cliente.name = upclient.name;
                cliente.email = upclient.email;
                cliente.tel = upclient.tel;
                cliente.descripcion = upclient.descripcion;
                db.SaveChanges();
            }
        }


        public void RemoveClient(string id)
        {
            throw new NotImplementedException();
        }
    }
}

