using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.DAL.EntityModels;

namespace Devbazaar.Repository.Common.Repositories
{
	public interface IBusinessRepository : IBaseRepository<BusinessEntity>
	{
		Task<BusinessEntity> GetByIdAsync (Guid id);
	}
}
