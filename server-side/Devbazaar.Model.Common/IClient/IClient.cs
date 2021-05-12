using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Devbazaar.Model.Common
{
	public interface IClient
	{
		string About { get; set; }
		string Website { get; set; }
		string Country { get; set; }
		string City { get; set; }
		int PostalCode { get; set; }

		List<IClientTask> Tasks { get; set; }
		List<IBusiness> Businesses { get; set; }
	}
}
