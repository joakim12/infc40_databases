using System.Collections.Generic;
using MicroSoft.Domain;

namespace MicroSoft.Service
{
    public interface IPostService
    {
        IEnumerable<Post> GetPosts();
        void AddPost(Post p);
        void UpdatePost(Post p);
        void DeletePost(Post p);
    }
}