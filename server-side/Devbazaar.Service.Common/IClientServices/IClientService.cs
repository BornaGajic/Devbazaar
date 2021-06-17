using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.Common.DTO.Client;
using Devbazaar.Common.IDTO.Business;
using Devbazaar.Common.DTO.ClientTask;
using Devbazaar.Model.Common;

namespace Devbazaar.Service.Common.IClientServices
{
	public interface IClientService
	{
		Task UpdateAsync (Dictionary<string, object> updateClient, Guid clientId);
		Task<IBusinessDto> AddToFavourites (Guid clientId, Guid businessId);
		Task<List<IBusiness>> GetFavouriteBusinesses (Guid clientId);
		Task<List<ClientTaskDto>> GetTasks (Guid clientId);
		Task<ClientDto> GetClientDataById (Guid id);
		Task RemoveFromFavourites (Guid clientId, Guid businessId);
	}
}
