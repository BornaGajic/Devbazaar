using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Devbazaar.Common.IPageData.Business
{
	interface IBusinessPage
	{
		// filter
		bool? Availability { get; set; }
		string City { get; set; }
		string Country { get; set; }
		string Username { get; set; }

		// sort
		bool? NameAsc { get; set; }
		bool? FavouriteCount { get; set; }
	}
}
