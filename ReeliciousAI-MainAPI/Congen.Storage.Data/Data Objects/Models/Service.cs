using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Congen.Storage.Data.Data_Objects.Models
{
    public class Service
    {
        [Key]
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public int Type { get; set; }

        public string Url { get; set; }

        public string PreviewUrl { get; set; }

        public string PosterUrl { get; set; }

        public string UrlHighQuality { get; set; }

        public string Category { get; set; }


        //configuration 
    }
}
