using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Devbazaar.Common.IDTO.Business;
using Devbazaar.Common.IDTO.ClientTask;
using Devbazaar.Common.PageData.Business;
using Devbazaar.Common.PageData.ClientTask;
using Devbazaar.Model.Common;

namespace Devbazaar.Service.Common.IBusinessServices
{
	public interface IBusinessService
	{
		Task<IBusinessDto> GetBusinessDataById (Guid id);
		Task CreateAsync (IBusiness newBusiness, List<ICategory> categories, Guid userId);
		Task UpdateAsync (Dictionary<string, object> item, Guid businessId);
		Task<IClientTaskDto> AcquireClientTaskAsync (Guid businessId, Guid clientTaskId);
		Task RemovePinnedTaskAsync (Guid businessId, Guid clientTaskId);
		Task<List<IBusinessDto>> PaginatedGetAsync (BusinessPage pageData, Guid? clientId = null);
		Task<List<IClientTaskDto>> PinnedClientTasksAsync (Guid businessId);
		Task<List<IClientTaskDto>> PaginatedAcquiredClientTasksAsync (ClientTaskPage pageData, Guid businessId);
		Task<List<ICategory>> GetCategories ();
		Task AddCategoryAsync (Guid businessId, Guid categoryId);
		Task RemoveCategoryAsync (Guid businessId, Guid categoryId);
	}
}
