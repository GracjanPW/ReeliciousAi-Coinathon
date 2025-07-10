using Congen.Storage.Business.Data_Objects.Requests;
using Congen.Storage.Business.Data_Objects.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Congen.Storage.Business
{
    public interface ISocialRepo
    {
        public Task<ResponseBase> PostToInstagram(PostToInstagramRequest request, string accessToken, string userId);
    }
}
