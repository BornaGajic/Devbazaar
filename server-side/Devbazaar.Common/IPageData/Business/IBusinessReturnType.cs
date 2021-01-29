using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.Model.Common;

namespace Devbazaar.Common.IPageData.Business
{
	public interface IBusinessReturnType
	{
		Guid Id { get; set; }
		
		string Username { get; set; }
		string Email { get; set; }
		string Description { get; set; }
		string About { get; set; }
		string Website { get; set; }
		
		bool Available { get; set; }
		bool IsFavourited { get; set; }

		string Country { get; set; }
		string City { get; set; }
		int PostalCode { get; set; }

		int Popularity { get; set; } // count of client favourites

		List<ICategory> Categories { get; set; }
	}
}
