using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Contexts;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.DAL.EntityModels;
using Devbazaar.DAL.Context;
using Devbazaar.Repository.Common.Repositories;

namespace Devbazaar.Repository.Repositories
{
	public class BusinessRepository : BaseRepository<BusinessEntity>, IBusinessRepository
	{
		public BusinessRepository (DevbazaarDbContext context) : base(context)
		{
		}

		public async Task<BusinessEntity> GetByIdAsync (Guid id)
		{
			return await Entities.FindAsync(id);
		}
	}
}
