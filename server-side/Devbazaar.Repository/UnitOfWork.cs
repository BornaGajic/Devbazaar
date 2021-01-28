using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.DAL;
using Devbazaar.DAL.Context;
using Devbazaar.Repository.Common;
using Devbazaar.Repository.Common.Repositories;

namespace Devbazaar.Repository
{
	public class UnitOfWork : IUnitOfWork
	{
		public DevbazaarDbContext DbContext { get; set; }
		
		public IUserRepository UserRepository { get; set; }
		public ICategoryRepository CategoryRepository { get; set; }
		public IBusinessRepository BusinessRepository { get; set; }
		public IClientTaskRepository ClientTaskRepository { get; set; }
		public IClientRepository ClientRepository { get; set; }

		public UnitOfWork (DevbazaarDbContext context, 
														IUserRepository userRepository,
														ICategoryRepository categoryRepository,
														IBusinessRepository businessRepository,
														IClientTaskRepository clientTaskRepository,
														IClientRepository clientRepository)
		{
			DbContext = context;
			UserRepository = userRepository;
			CategoryRepository = categoryRepository;
			BusinessRepository = businessRepository;
			ClientTaskRepository = clientTaskRepository;
			ClientRepository = clientRepository;
		}

		public virtual Task<int> AddAsync<TEntity> (TEntity entity) where TEntity : BaseEntity
		{
			DbContext.Set<TEntity>().Add(entity);
			
			return Task.FromResult(1);
		}

		public virtual Task<int> UpdateAsync<TEntity> (TEntity entity) where TEntity : BaseEntity
		{
			DbContext.Entry(entity).State = EntityState.Modified;

			return Task.FromResult(1);
		}

		public virtual Task<int> DeleteAsync<TEntity> (TEntity entity) where TEntity : BaseEntity
		{
			DbContext.Set<TEntity>().Remove(entity);

			return Task.FromResult(1);
		}

		public Task<int> CommitAsync<TEntity> ()
		{
			return DbContext.SaveChangesAsync();
		}

		public Task<int> RollbackAsync<TEntity> (TEntity entity) where TEntity : BaseEntity
		{
			DbContext.Entry(entity).State = EntityState.Unchanged;

			return Task.FromResult(1);
		}

		public void Dispose ()
		{
			DbContext.Dispose();
		}
	}
}
