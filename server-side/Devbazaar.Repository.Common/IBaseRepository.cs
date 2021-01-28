using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Devbazaar.Repository.Common
{
	public interface IBaseRepository<TEntity>
	{
		IQueryable<TEntity> Table { get; }
		IQueryable<TEntity> TableAsNoTracking { get; }
	}
}
