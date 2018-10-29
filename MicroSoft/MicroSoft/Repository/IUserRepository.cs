using System.Collections.Generic;
using MicroSoft.Domain;

namespace MicroSoft.Repository
{
    public interface IUserRepository
    {
        IEnumerable<User> GetUser(User u);
        void AddUser(User u);
        void UpdateUser(User u);
        void DeleteUser(User u);
    }
}