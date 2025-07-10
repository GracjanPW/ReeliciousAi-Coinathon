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


namespace Congen.Storage.Business
{
    public class AccountRepo : IAccountRepo
    {
        public Account GetAccountByClerkId(string Id) 
        {
            Account account = new Account();

            try
            {
                using (SqlConnection connection = new SqlConnection(Util.ConnectionString))
                {
                    try
                    {
                        SqlCommand cmd = new SqlCommand("con_GetAccountByClerkId", connection);
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        cmd.Parameters.Add(new SqlParameter("ClerkId", Id));

                        if (connection.State == System.Data.ConnectionState.Closed)
                        {
                            connection.Open();
                        }

                        using (var dr = cmd.ExecuteReader())
                        {
                            if (dr.Read())
                            {
                                account.Id = (Guid)dr["Id"];
                                account.ClerkId = (string)dr["ClerkId"];
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

                return account;
            }

            catch(Exception ex)
            {
                throw new Exception("An error occured while retrieving the Account.", ex);
            }
        }

        public string CreateAccount(Account account) 
        {
            string userId = string.Empty;
            
            try
            {
                using (SqlConnection connection = new SqlConnection(Util.ConnectionString))
                {
                    try
                    {
                        SqlCommand cmd = new SqlCommand("con_CreateAccount", connection);
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        cmd.Parameters.Add(new SqlParameter("ClerkId", account.ClerkId));

                        if (connection.State == System.Data.ConnectionState.Closed)
                        {
                            connection.Open();
                        }

                        userId = (string)cmd.ExecuteScalar();
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
            }

            catch(Exception ex)
            {
                throw new Exception("An error occured while creating the account.", ex);
            }

            return userId;
        }
    }

}
