using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Congen.Storage.Data.Data_Objects.Enums
{
    public enum ErrorCodes
    {
        SkillIssue = 101,
        BadRequest = 400,
        Unauthorized = 401,
        Forbidden = 403,
        FileNotFound = 404,
        //instagram
        PostToInstagramFailed = 1000,
        InvalidMediaType = 1001,
    }
}
