using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.DAL;
using Devbazaar.Repository.Common.Repositories;

namespace Devbazaar.Repository.Common
{
	public interface IUnitOfWork : IDisposable
	{
		IUserRepository UserRepository { get; set; }
		ICategoryRepository CategoryRepository { get; set; }
		IBusinessRepository BusinessRepository { get; set; }
		IClientTaskRepository ClientTaskRepository { get; set; }
		IClientRepository ClientRepository { get; set; }

		Task<int> AddAsync<TEntity> (TEntity entity) where TEntity : BaseEntity;
		Task<int> UpdateAsync<TEntity> (TEntity entity) where TEntity : BaseEntity;
		Task<int> DeleteAsync<TEntity> (TEntity entity) where TEntity : BaseEntity;
		Task<int> CommitAsync<TEntity> ();
		Task<int> RollbackAsync<TEntity> (TEntity entity) where TEntity : BaseEntity;
	}
}
