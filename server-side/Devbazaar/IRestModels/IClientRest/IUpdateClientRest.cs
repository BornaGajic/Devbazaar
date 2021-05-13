using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Devbazaar.IRestModels.IClientRest
{
	public interface IUpdateClientRest
	{
		string About { get; set; }
		string Website { get; set; }
		string Country { get; set; }
		string City { get; set; }
		int? PostalCode { get; set; }
	}
}
