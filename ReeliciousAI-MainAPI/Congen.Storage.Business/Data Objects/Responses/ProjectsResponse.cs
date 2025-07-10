using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Congen.Storage.Data.Data_Objects.Models;

namespace Congen.Storage.Business.Data_Objects.Responses
{
    public class ProjectsResponse : ResponseBase
    {
        [Key]
        public List<Project> ProjectsData { get; set; }


    }
}
