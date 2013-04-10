using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace MvcTaller.Models
{
    public class Client  
    {
        public string name { get; set; }
        public string id { get; set; }
        public string email { get; set; }
        public string tel { get; set; }
        public string descripcion { get; set; }

        internal void SaveChanges()
        {
            throw new NotImplementedException();
        }
    }
}