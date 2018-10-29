using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Configuration;
using MicroSoft.Domain;
using MicroSoft.Exceptions;
using MicroSoft.Repository;
using MySql.Data.MySqlClient;

namespace MicroSoft.Service
{
    public class UserService : IUserService
    {
        private IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
        }

        public User GetUser(User u)
        {
            try
            {
                return _userRepository.GetUser(u).First();
            }
            catch (Exception e)
            {
                throw new EntityNotFoundException("Oops, user not found!", e);
            }
        }

        public void AddUser(User u)
        {
            _userRepository.AddUser(u);
        }

        public void UpdateUser(User u)
        {
            User user = GetUser(u);

            if (user is null)
                throw new EntityNotFoundException(
                    "Oops, unable to update user! Make sure username and/or password is valid");

            _userRepository.UpdateUser(u);
        }

        public void DeleteUser(User u)
        {
            User user = GetUser(u);

            if (user is null)
                throw new EntityNotFoundException("Oops, user not found! Failed to delete.");

            _userRepository.DeleteUser(u);
        }
    }
}