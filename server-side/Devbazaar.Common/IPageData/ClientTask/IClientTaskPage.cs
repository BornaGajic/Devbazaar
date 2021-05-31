using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Devbazaar.Common.IPageData.ClientTask
{
	interface IClientTaskPage
	{
		// filter
		int LowPrice { get; set; }
		int HighPrice { get; set; }

		// sort
		bool? OldestDate { get; set; }
	}
}
