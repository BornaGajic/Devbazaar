using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.DAL.EntityModels;

namespace Devbazaar.Repository.Common.Repositories
{
	public interface IClientRepository : IBaseRepository<ClientEntity>
	{
		Task<ClientEntity> GetByIdAsync (Guid id);
	}
}
