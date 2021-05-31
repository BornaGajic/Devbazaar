using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.Common.IDTO.ClientTask;
using Devbazaar.Common.PageData.ClientTask;
using Devbazaar.Model.Common;

namespace Devbazaar.Service.Common.IClientTaskServices
{
	public interface IClientTaskService
	{
		Task<IClientTask> CreateAsync (IClientTask newTask);
		Task UpdateAsync (Dictionary<string, object> item, Guid clientTaskId);
		Task DeleteAsync (Guid taskId);

		Task<List<IClientTaskDto>> PaginatedGetAsync (ClientTaskPage pageData, Guid? businessId = null);
	}
}
