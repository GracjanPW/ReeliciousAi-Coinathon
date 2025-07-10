using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Congen.Storage.Data.Data_Objects.Models
{
    public class Account
    {
        [Key]
        public Guid Id { set; get;}

        public string ClerkId { set; get; }
    }
}
