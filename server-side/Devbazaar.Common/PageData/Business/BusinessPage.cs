using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.Common.IPageData.Business;

namespace Devbazaar.Common.PageData.Business
{
	public class BusinessPage : Page, IBusinessPage
	{
		// filter
		public bool? Availability { get; set; } = null;
		public string City { get; set; } = string.Empty;
		public string Country { get; set; } = string.Empty;
		public string Username { get; set; } = string.Empty;

		// sort
		public bool? NameAsc { get; set; } = null;
		public bool? FavouriteCount { get; set; } = false;
	}
}
