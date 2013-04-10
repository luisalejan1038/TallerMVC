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
    public class SQLClientsProvider: IClientsProvider
    {
        public List<Models.Client> GetClients()
        {
            using (var db = new ClientContext())
            {
                var query = from d in db.Clients
                            select d;

                return query.ToList();
            }
        }

        public void AddClient(Client client)
        {
            using (var db = new ClientContext())
            {

                db.Clients.Add(client);
                Debug.WriteLine("Id ultimo cliente: " + client.id);
                db.SaveChanges();

                var query = db.Clients.Where(c => 1 == 1).OrderByDescending(c => c.id).ToList();

                foreach (Client item in query)
                {
                    Debug.WriteLine(item.id + " " + item.name + " " + item.email + " " + item.tel + " " + item.descripcion);
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