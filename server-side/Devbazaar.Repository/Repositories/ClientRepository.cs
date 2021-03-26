using System;
using System.Collections.Generic;
using System.Data.Entity;
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
			var client = await Entities.FindAsync(id);

			if (client == null) return null;

			var businesses = Table.Where(c => c.Id == client.Id).SelectMany(c => c.Businesses);
			client.Businesses = await businesses.ToListAsync();

			var tasks = Table.Where(c => c.Id == client.Id).SelectMany(c => c.Tasks);
			client.Tasks = await tasks.ToListAsync();

			return client;
		}
	}
}
