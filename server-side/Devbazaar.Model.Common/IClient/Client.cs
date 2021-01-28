using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Devbazaar.Model.Common
{
	public interface IClient
	{
		string FirstName { get; set; }
		string LastName { get; set; }
	}
}
