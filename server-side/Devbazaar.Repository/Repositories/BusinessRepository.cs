using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Remoting.Contexts;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.DAL.EntityModels;
using Devbazaar.DAL.Context;
using Devbazaar.Repository.Common.Repositories;
using Devbazaar.Common.DTO.Business;
using System.Data.Entity;

namespace Devbazaar.Repository.Repositories
{
	public class BusinessRepository : BaseRepository<BusinessEntity>, IBusinessRepository
	{
		public BusinessRepository (DevbazaarDbContext context) : base(context)
		{
		}

		public async Task<BusinessEntity> GetByIdAsync (Guid id)
		{
			var business = await Entities.FindAsync(id);

			if (business == null) return null;

			var categories = Table.Where(b => b.Id == business.Id).SelectMany(b => b.Categories);

			business.Categories = await categories.ToListAsync();

			return business;
		}
	}
}
