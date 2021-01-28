using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.DAL;
using Devbazaar.DAL.Context;
using Devbazaar.Repository.Common;

namespace Devbazaar.Repository
{
	public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : BaseEntity
	{
		private DevbazaarDbContext _context;
		private DbSet<TEntity> _dbSet;

		public BaseRepository (DevbazaarDbContext context)
		{
			_context = context;
		}

		protected virtual DbSet<TEntity> Entities 
		{
			get
			{
				if (_dbSet == null)
					_dbSet = _context.Set<TEntity>();
				
				return _dbSet;
			}	
		}		

		public virtual IQueryable<TEntity> Table => Entities;
		public virtual IQueryable<TEntity> TableAsNoTracking => Entities.AsNoTracking();
	}
}
