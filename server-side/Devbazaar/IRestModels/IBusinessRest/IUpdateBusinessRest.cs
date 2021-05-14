using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.Model.Common;

namespace Devbazaar.IRestModels.IBusinessRest
{
	public interface IUpdateBusinessRest
	{
		string Description { get; set; }
		string About { get; set; }
		string Website { get; set; }
		bool? Available { get; set; }
		string Country { get; set; }
		string City { get; set; }
		int? PostalCode { get; set; }
	}
}
