using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Devbazaar.IRestModels.IUserRest
{
	public interface IDeleteUserRest
	{
		string Email { get; set; }
		string Username { get; set; }
	}
}
