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
    public class AuthRepo : IAuthRepo
    {
        public NSession GetSession(string token)
        {
            NSession session = new NSession();

            try
            {
                using (SqlConnection connection = new SqlConnection(Util.ConnectionString))
                {
                    try
                    {
                        SqlCommand cmd = new SqlCommand("con_GetSessionAndUser", connection);
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        cmd.Parameters.Add(new SqlParameter("SessionToken", token));

                        if (connection.State == System.Data.ConnectionState.Closed)
                        {
                            connection.Open();
                        }

                        using (var dr = cmd.ExecuteReader())
                        {
                            if (dr.Read())
                            {
                                session.Token = (string)dr["SessionToken"];
                                session.UserId = (Guid)dr["Id"];
                                session.Expires = (DateTimeOffset)dr["Expires"];

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

                return session;
            }

            catch (Exception ex)
            {
                throw new Exception("An error occured while retrieving the session.", ex);
            }
        }
    }
}
