using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace MvcTaller.Models
{
    public class ClientContext: DbContext
    {
        public DbSet<Client> Clients { get; set; }
    }
}