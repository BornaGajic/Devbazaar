using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.Common.IPageData.ClientTask;
using Devbazaar.Common.PageData.ClientTask;
using Devbazaar.Model.Common;

namespace Devbazaar.Service.Common.IClientTaskServices
{
	public interface IClientTaskService
	{
		Task<bool> CreateAsync (IClientTask newTask);
		Task<bool> UpdateAsync (Dictionary<string, object> item, Guid clientTaskId);
		Task<bool> DeleteAsync (Guid taskId);

		Task<List<IClientTaskReturnType>> PaginatedGetAsync (ClientTaskPage pageData, Guid? clientId = null);
	}
}
