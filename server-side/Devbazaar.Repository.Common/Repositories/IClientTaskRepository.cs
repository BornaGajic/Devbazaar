using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Devbazaar.Common.IDTO.ClientTask;
using Devbazaar.Common.PageData.ClientTask;
using Devbazaar.DAL.EntityModels;

namespace Devbazaar.Repository.Common.Repositories
{
	public interface IClientTaskRepository : IBaseRepository<TaskEntity> 
	{
		Task<TaskEntity> GetByIdAsync (Guid id);

		Task<TaskEntity> UpdateAsync (Dictionary<string, object> item, Guid clientTaskId);
		Task<List<TaskEntity>> GetPinnedTasksAsync (Guid businessId);

		// clientId != null -> get self posted tasks | businessId != null -> get acquired tasks | both null -> classic get with pagination
		Task<List<IClientTaskDto>> PaginatedGetAsync (ClientTaskPage pageData, Guid? clientId = null, Guid? businessId = null);
	}
}
