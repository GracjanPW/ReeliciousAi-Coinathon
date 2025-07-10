using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Congen.Storage.Data.Data_Objects.Models
{
    public class NUser
    {
        [Key]
        public string Id { set; get; }

        public string Name { set; get; }

        public string Email { set; get; }

        public DateTimeOffset EmailVerified { set; get; }
        
        public string Image { set; get; }
    }
}
