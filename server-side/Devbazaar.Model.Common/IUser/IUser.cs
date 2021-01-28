using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Devbazaar.Model.Common.IUser
{
	public interface IUser
	{
		Guid Id { get; set; }
		string Username { get; set; }
		string Password { get; set; }
		string Email { get; set; }
		string Logo { get; set; }
	}
}
