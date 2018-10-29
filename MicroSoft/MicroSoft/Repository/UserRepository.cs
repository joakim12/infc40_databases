using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using MicroSoft.Domain;
using MySql.Data.MySqlClient;

namespace MicroSoft.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly IDbConnection _db;
        private readonly string _conn;

        public UserRepository()
        {
            string _conn = DbConfig.MySql;
            _db = new MySqlConnection(_conn);
        }

        public IEnumerable<User> GetUser(User u)
        {
            var param = new DynamicParameters();
            param.Add("@uname", u.Username);
            param.Add("@pw", u.Pw);

            return _db.Query<User>("read_user", param, commandType: CommandType.StoredProcedure)
                .ToList();
        }


        public void AddUser(User u)
        {
            var param = new DynamicParameters();
            param.Add("@uname", u.Username);
            param.Add("@pword", u.Pw);

            _db.Query<Post>("create_user", param, commandType: CommandType.StoredProcedure);
        }

        public void UpdateUser(User u)
        {
            var param = new DynamicParameters();
            param.Add("@uname", u.Username);
            param.Add("@pword", u.Pw);

            _db.Query<Post>("update_user", param, commandType: CommandType.StoredProcedure);
        }

        public void DeleteUser(User u)
        {
            var param = new DynamicParameters();
            param.Add("@uname", u.Username);
            param.Add("@pword", u.Pw);

            _db.Execute("delete_user", param, commandType: CommandType.StoredProcedure);
        }
    }
}