using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.Model.Common;

namespace Devbazaar.Service.Common.IClientServices
{
	public interface IClientService
	{
		Task<bool> UpdateAsync (Dictionary<string, object> updateClient, Guid clientId);
	}
}
