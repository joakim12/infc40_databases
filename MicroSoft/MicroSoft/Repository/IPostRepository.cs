using System.Collections.Generic;
using MicroSoft.Domain;

namespace MicroSoft.Repository
{
    public interface IPostRepository
    {
        IEnumerable<Post> GetEntities();
        void AddEntity(Post p);
        void UpdateEntity(Post p);
        void DeleteEntity(Post p);
    }
}