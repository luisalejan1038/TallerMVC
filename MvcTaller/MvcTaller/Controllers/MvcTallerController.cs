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
        
        IClientsProvider provider = new FakeClientsProvider();

        public ActionResult Clients()
        {
            return View();
        }

        public JsonResult GetClients()
        {
            var lista = provider.GetClients(); 
            return Json(lista, JsonRequestBehavior.AllowGet); 
        }

        public ActionResult AddClients()
        {
            return new EmptyResult();
        }

        public ActionResult RemoveClient()
        {
            return View();
        }

    }
}
