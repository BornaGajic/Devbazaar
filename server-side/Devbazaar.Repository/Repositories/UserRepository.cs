using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.DAL.Context;
using Devbazaar.DAL.EntityModels;
using Devbazaar.Repository.Common.Repositories;
using static Devbazaar.Utility.Utility;

namespace Devbazaar.Repository.Repositories
{
	public class UserRepository : BaseRepository<UserEntity>, IUserRepository
	{
		public UserRepository (DevbazaarDbContext context) : base(context)
		{
		}

		public async Task<UserEntity> CheckExistence (string email, string password)
		{
			var result = from user in TableAsNoTracking where user.Email == email && user.Password == password select user;
			
			UserEntity registeredUser;
			try
			{
				registeredUser = await result.SingleAsync();
			}
			catch // ArgumentNullException
			{
				return null;
			}

			return registeredUser != null ? registeredUser : null;
		}
	}
}
