using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.DAL;
using Devbazaar.DAL.EntityModels;

namespace Devbazaar.Repository.Common.Repositories
{
	public interface IUserRepository : IBaseRepository<UserEntity>
	{
		Task<UserEntity> CheckExistence (string email, string password);
		Task<UserEntity> GetByIdAsync (Guid guid);
	}
}
