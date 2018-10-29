using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using MicroSoft.Domain;
using MicroSoft.Repository;
using MySql.Data.MySqlClient;

namespace MicroSoft.Service
{
    public class PostService : IPostService
    {
        private IPostRepository _postRepository;

        public PostService(IPostRepository postRepository)
        {
            _postRepository = postRepository ?? throw new ArgumentNullException(nameof(postRepository));
        }

        public IEnumerable<Post> GetPosts()
        {
            try
            {
                return _postRepository.GetEntities();
            }
            catch (Exception e)
            {
                throw new Exception("Oops!", e);
            }
        }


        public void AddPost(Post p)
        {
            _postRepository.AddEntity(p);
        }

        public void UpdatePost(Post p)
        {
            _postRepository.UpdateEntity(p);
        }

        public void DeletePost(Post p)
        {
            _postRepository.DeleteEntity(p);
        }
    }
}