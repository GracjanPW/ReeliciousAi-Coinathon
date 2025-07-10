using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Congen.Storage.Data.Data_Objects.Models
{
    public class NSession
    {
        [Key]
        public string Token { set; get; }

        public Guid UserId { set; get; }

        public DateTimeOffset Expires { set; get; }
    }
}
