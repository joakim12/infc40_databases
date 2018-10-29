using System;
using Microsoft.AspNetCore.Mvc;
using MicroSoft.Domain;
using MicroSoft.Exceptions;
using MicroSoft.Service;
using MySql.Data.MySqlClient;

namespace MicroSoft.Controllers
{
    [Route("[controller]")]
    public class UserController : Controller
    {
        private readonly IUserService _UserService;

        public UserController(IUserService userService)
        {
            _UserService = userService ?? throw new ArgumentNullException(nameof(userService));
        }

        // POST /user
        [HttpPost]
        [Route("/user")]
        public IActionResult GetUser([FromBody] User u)
        {
            try
            {
                User user = _UserService.GetUser(u);

                return Ok(user);
            }
            catch (Exception e)
            {
                if (e is InvalidOperationException)
                    return NotFound("User not found!");

                return BadRequest("Oops, something went wrong!");
            }
        }

        // POST /create-user
        [HttpPost]
        [Route("/create-user")]
        public IActionResult AddUser([FromBody] User u)
        {
            try
            {
                _UserService.AddUser(u);
                return Ok("User added!");
            }
            catch (Exception e)
            {
                return BadRequest(e is MySqlException ? e.Message : "Oops, something went wrong!");
            }
        }

        // PUT /update-user
        [HttpPut]
        [Route("/update-user")]
        public IActionResult UpdateUser([FromBody] User u)
        {
            try
            {
                _UserService.UpdateUser(u);
                return Ok("User updated!");
            }
            catch (Exception e)
            {
                return BadRequest(e is EntityNotFoundException ? e.Message : "Oops, something went wrong!");
            }
        }

        // DELETE /delete-user
        [HttpDelete]
        [Route("/delete-user")]
        public IActionResult DeleteUser([FromBody] User u)
        {
            try
            {
                _UserService.DeleteUser(u);
                return Ok("User deleted!");
            }
            catch (Exception e)
            {
                return BadRequest(e is EntityNotFoundException ? e.Message : "Oops, something went wrong!");
            }
        }
    }
}