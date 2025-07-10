using Congen.Storage.Business.Data_Objects.Requests;
using Congen.Storage.Data;
using Congen.Storage.Data.Data_Objects.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Clerk.Net.Client.Models;


namespace Congen.Storage.Business
{
    public class UserRepo : IUserRepo
    {
        public NUser GetUserById(Guid id)
        {
            NUser user = new NUser();

            try
            {
                using (SqlConnection connection = new SqlConnection(Util.ConnectionString))
                {
                    try
                    {
                        SqlCommand cmd = new SqlCommand("con_GetUserById", connection);
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        cmd.Parameters.Add(new SqlParameter("Id", id));

                        if (connection.State == System.Data.ConnectionState.Closed)
                        {
                            connection.Open();
                        }

                        using (var dr = cmd.ExecuteReader())
                        {
                            if (dr.Read())
                            {
                                user.Id = (string)dr["Id"];
                                user.Name = (string)dr["Name"];
                                user.Email = (string)dr["Email"];
                                user.Image = (string)dr["Image"];
                                if (dr["EmailVerified"] != null)
                                {
                                    user.EmailVerified = (DateTimeOffset)dr["EmailVerified"];
                                }
                            }
                        }
                    }

                    catch (Exception ex)
                    {
                        throw ex;
                    }

                    finally
                    {
                        connection.Close();
                    }
                }

                return user;
            }

            catch (Exception ex)
            {
                throw new Exception("An error occured while retrieving the Account.", ex);
            }
        }
    }
}
