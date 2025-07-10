using Azure.Core;
using Clerk.Net.Client.Models;
using Congen.Storage.Business.Data_Objects.Requests;
using Congen.Storage.Data.Data_Objects.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Congen.Storage.Business
{
    public interface IAuthRepo
    {
            public NSession GetSession(string token);

    }
}
