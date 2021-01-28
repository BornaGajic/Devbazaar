using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Devbazaar.IRestModels.IUserRest
{
	public interface ILoginRest
	{
		string Email { get; set; }
		string Password { get; set; }
	}
}
