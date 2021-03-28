using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.Common.DTO.User;
using Devbazaar.DAL.EntityModels;
using Devbazaar.Model.Common.IUser;
using static Devbazaar.Utility.Utility;

namespace Devbazaar.Service.Common.IUserServices
{
	public interface IUserService
	{
		Task<string> CreateAsync (IUser user, TypeOfUser typeOfUser);
		Task<bool> UpdateAsync (Dictionary<string, object> item, Guid userId);
		Task<bool> DeleteAsync (IUser user);
		Task<string> LoginAsync (IUser user);
	}
}
