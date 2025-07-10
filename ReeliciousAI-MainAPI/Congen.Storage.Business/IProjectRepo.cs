using Azure.Core;
using Congen.Storage.Business.Data_Objects.Requests;
using Congen.Storage.Data.Data_Objects.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Congen.Storage.Business
{
    public interface IProjectRepo
    {
        public Project GetProject(int id, Guid userId);

        public List<Project> GetProjects(Guid user_id);

        public int CreateProject(Project data);

        public int UpdateProject(UpdateProjectRequest data);
        public void DeleteProject(int projectId, Guid userId);
    }
}
