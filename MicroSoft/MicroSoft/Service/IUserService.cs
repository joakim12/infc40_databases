using MicroSoft.Domain;

namespace MicroSoft.Service
{
    public interface IUserService
    {
        User GetUser(User u);
        void AddUser(User u);
        void UpdateUser(User u);
        void DeleteUser(User u);
    }
}