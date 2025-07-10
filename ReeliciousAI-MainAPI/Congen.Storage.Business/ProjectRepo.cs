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
using Azure.Core;

namespace Congen.Storage.Business
{
    public class ProjectRepo : IProjectRepo
    {
        public List<Project> GetProjects(Guid userId)
        {
            List<Project> projects = new List<Project>();

            try
            {
                using (SqlConnection connection = new SqlConnection(Util.ConnectionString))
                {
                    try
                    {
                        SqlCommand cmd = new SqlCommand("con_GetProjects", connection);
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        cmd.Parameters.Add(new SqlParameter("UserId", userId));

                        if (connection.State == System.Data.ConnectionState.Closed)
                        {
                            connection.Open();
                        }

                        using (var dr = cmd.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                Project project = new Project();

                                project.Id = (int)dr["Id"];
                                project.Title = (string)dr["Title"];
                                project.Status = (string)dr["Status"];

                                projects.Add(project);
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
            }

            catch (Exception ex)
            {
                throw new Exception("An error occured while retrieving the projects.", ex);
            }

            return projects;
        }

        public int CreateProject(Project project)
        {
            int Id = 0;

            try
            {
                using (SqlConnection connection = new SqlConnection(Util.ConnectionString))
                {
                    try
                    {
                        SqlCommand cmd = new SqlCommand("con_CreateProject", connection);
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        cmd.Parameters.Add(new SqlParameter("Title", project.Title));
                        cmd.Parameters.Add(new SqlParameter("Prompt", project.Prompt));
                        cmd.Parameters.Add(new SqlParameter("CreatorId", project.CreatorId));
                        cmd.Parameters.Add(new SqlParameter("AudioUrl", project.AudioUrl));
                        cmd.Parameters.Add(new SqlParameter("VideoUrl", project.VideoUrl));

                        if (connection.State == System.Data.ConnectionState.Closed)
                        {
                            connection.Open();
                        }

                        Id = (int)cmd.ExecuteScalar();
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

                return Id;
            }

            catch (Exception ex)
            {
                throw new Exception("An error occured while creating the project.", ex);
            }
        }

        public Project GetProject(int id, Guid userId)
        {
            Project project = new Project();

            try
            {
                using (SqlConnection connection = new SqlConnection(Util.ConnectionString))
                {
                    try
                    {
                        SqlCommand cmd = new SqlCommand("con_GetProject", connection);
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        cmd.Parameters.Add(new SqlParameter("Id", id));
                        cmd.Parameters.Add(new SqlParameter("CreatorId", userId));
                        
                        if (connection.State == System.Data.ConnectionState.Closed)
                        {
                            connection.Open();
                        }

                        using (var dr = cmd.ExecuteReader())
                        {
                            if (dr.Read())
                            {
                                project.Id = (int)dr["Id"];
                                project.Title = (string)dr["Title"];
                                project.Status = (string)dr["Status"];
                                project.CreatorId = (Guid)dr["CreatorId"];
                                project.AudioUrl = (string)dr["AudioUrl"];
                                project.VideoUrl = (string)dr["VideoUrl"];
                                
                                project.Prompt = (string)dr["Prompt"];

                                if (dr["CaptionsUrl"] != DBNull.Value) project.CaptionsUrl = (string)dr["CaptionsUrl"];

                                if(dr["TtsUrl"] != DBNull.Value) project.TtsUrl = (string)dr["TtsUrl"];
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
            }

            catch (Exception ex)
            {
                throw new Exception("An error occured while retrieving the project.", ex);
            }

            return project;
        }

       public int UpdateProject(UpdateProjectRequest data) 
        {
            int Id = 0;

            try
            {
                using (SqlConnection connection = new SqlConnection(Util.ConnectionString))
                {
                    try
                    {
                        SqlCommand cmd = new SqlCommand("con_UpdateProject", connection);
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;
                        
                        cmd.Parameters.Add(new SqlParameter("ProjectId", data.Id));
                        cmd.Parameters.Add(new SqlParameter("TtsUrl", data.TtsUrl));
                        cmd.Parameters.Add(new SqlParameter("CaptionsUrl", data.CaptionsUrl));
                        cmd.Parameters.Add(new SqlParameter("StatusId", 2));

                        if (connection.State == System.Data.ConnectionState.Closed)
                        {
                            connection.Open();
                        }

                        Id = (int)cmd.ExecuteScalar();
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

                return Id;
            }

            catch (Exception ex)
            {
                throw new Exception("An error occured while updating the project.", ex);
            }
        }
    
        public void DeleteProject(int projectId, Guid userId) {
            try 
            {
                using (SqlConnection connection = new SqlConnection(Util.ConnectionString)) 
                {
                    try 
                    { 
                        SqlCommand cmd = new SqlCommand("con_deleteProject", connection);
                        cmd.CommandType = System.Data.CommandType.StoredProcedure;

                        cmd.Parameters.Add(new SqlParameter("Id", projectId));
                        cmd.Parameters.Add(new SqlParameter("CreatorId", userId));

                        if (connection.State == System.Data.ConnectionState.Closed) 
                        {
                            connection.Open();
                        }

                        int deletedProjectId = (int)cmd.ExecuteScalar();

                        

                    } 
                    catch (Exception ex)
                    {
                        throw ex;
                    }  finally {
                        connection.Close();
                    }
                }
            } 
            catch (Exception ex)
            {
                throw new Exception("An error occured while deleting the project.", ex);
            }
        }
    }
}
