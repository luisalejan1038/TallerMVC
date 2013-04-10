using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MvcTaller.DataAccess;
using MvcTaller.Models;

namespace MvcTaller.Controllers
{
    public class MvcTallerController : Controller
    {

        IClientsProvider provider = new SQLClientsProvider();

        public ActionResult Clients()
        {
            return View();
        }

        public JsonResult GetClients()
        {
            var lista = provider.GetClients(); 
            return Json(lista, JsonRequestBehavior.AllowGet); 
        }

        public ActionResult AddClient(string id, string name, string email, string tel, string descripcion)  
        {
            Client Client = new Client();
            Client.id = id;
            Client.name = name;
            Client.email = email;
            Client.tel = tel;
            Client.descripcion = descripcion; 
            
            provider.AddClient(Client);
            
            return new EmptyResult();
        }


        public ActionResult UpdateClient(string id, string name, string email, string tel, string descripcion)
        {
            Client Client = new Client();
            Client.id = id;
            Client.name = name;            
            Client.email = email;
            Client.tel = tel;
            Client.descripcion = descripcion;

            provider.UpdateClient(Client);

            return new EmptyResult();
        }


        public ActionResult RemoveClient(string id)
        {
            provider.RemoveClient(id);

            return new EmptyResult();
            
        }

    }
}
