using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.Common.DTO.Business;
using Devbazaar.Common.IPageData.Business;
using Devbazaar.Common.IPageData.ClientTask;
using Devbazaar.Common.PageData.Business;
using Devbazaar.Common.PageData.ClientTask;
using Devbazaar.DAL.EntityModels;
using Devbazaar.Model.Common;
using static Devbazaar.Utility.Utility;

namespace Devbazaar.Service.Common.IBusinessServices
{
	public interface IBusinessService
	{
		Task<IBusinessDto> GetBusinessDataById (Guid id);
		Task<int> CreateAsync (IBusiness newBusiness, List<ICategory> categories, Guid userId);
		Task<int> UpdateAsync (Dictionary<string, object> item, Guid businessId);
		Task<bool> AcquireClientTaskAsync (Guid businessId, Guid clientTaskId);
		Task<List<IBusinessDto>> PaginatedGetAsync (BusinessPage pageData, Guid? clientId = null);
		Task<List<IClientTaskReturnType>> AcquiredClientTasksAsync (ClientTaskPage pageData, Guid businessId);
		
	}
}
