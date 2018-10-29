using System;
using Microsoft.AspNetCore.Mvc;
using MicroSoft.Domain;
using MicroSoft.Service;

namespace MicroSoft.Controllers
{
    [Route("[controller]")]
    public class PostController : Controller
    {
        private readonly IPostService _postService;

        public PostController(IPostService postService)
        {
            _postService = postService ?? throw new ArgumentNullException(nameof(postService));
        }

        // GET /posts
        [HttpGet]
        [Route("/posts")]
        public IActionResult GetPosts()
        {
            try
            {
                var posts = _postService.GetPosts();

                if (posts is null)
                    return NotFound("Unable to retrieve posts!");

                return Ok(posts);
            }
            catch (Exception e)
            {
                return BadRequest("Oops, something went wrong!" + e.Message);
            }
        }

        // POST /create-post
        [HttpPost]
        [Route("/create-post")]
        public IActionResult AddPost([FromBody] Post post)
        {
            try
            {
                _postService.AddPost(post);
                return Ok("Post added!");
            }
            catch (Exception e)
            {
                return BadRequest("Oops, something went wrong!" + e.Message);
            }
        }

        // PUT /update-post
        [HttpPut]
        [Route("/update-post")]
        public IActionResult UpdatePost([FromBody] Post post)
        {
            try
            {
                _postService.UpdatePost(post);
                return Ok("Post updated!");
            }
            catch (Exception e)
            {
                return BadRequest("Oops, something went wrong!" + e.Message);
            }
        }

        // DELETE /delete-post
        [HttpDelete]
        [Route("/delete-post/{id}")]
        public IActionResult DeletePost(int id)
        {
            try
            {
                var post = new Post() {PostId = id};
                _postService.DeletePost(post);
                return Ok("Post deleted!");
            }
            catch (Exception e)
            {
                return BadRequest("Oops, something went wrong!" + e.Message);
            }
        }
    }
}