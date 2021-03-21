using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.DAL.Context;
using Devbazaar.DAL.EntityModels;
using Devbazaar.Repository.Common.Repositories;

namespace Devbazaar.Repository.Repositories
{
	public class ClientRepository : BaseRepository<ClientEntity>, IClientRepository
	{
		public ClientRepository (DevbazaarDbContext context) : base(context)
		{
		}

		public async Task<ClientEntity> GetByIdAsync (Guid id)
		{
			return await Entities.FindAsync(id);
		}
	}
}
