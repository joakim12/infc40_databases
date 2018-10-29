using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Dapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using MicroSoft.Domain;
using MySql.Data.MySqlClient;

namespace MicroSoft.Repository
{
    public class PostRepository : IPostRepository
    {
        private readonly IDbConnection _db;
        private readonly string _conn;

        public PostRepository()
        {
            string _conn = DbConfig.MySql;
            _db = new MySqlConnection(_conn);
        }

        public IEnumerable<Post> GetEntities()
        {
            return _db.Query<Post>("read_posts", commandType: CommandType.StoredProcedure)
                .ToList();
        }

        public void AddEntity(Post p)
        {
            var param = new DynamicParameters();
            param.Add("@postTitle", p.PostTitle);
            param.Add("@postContent", p.PostContent);
            param.Add("@postPublisher", p.PostPublisher);

            _db.Query<Post>("create_post", p, commandType: CommandType.StoredProcedure);
        }

        public void UpdateEntity(Post p)
        {
            var param = new DynamicParameters();
            param.Add("@title", p.PostTitle);
            param.Add("@content", p.PostContent);

            _db.Query<Post>("update_post", param, commandType: CommandType.StoredProcedure);
        }

        public void DeleteEntity(Post p)
        {
            var param = new DynamicParameters();
            param.Add("@postId", p.PostId);

            _db.Execute("delete_post", param, commandType: CommandType.StoredProcedure);
        }
    }
}