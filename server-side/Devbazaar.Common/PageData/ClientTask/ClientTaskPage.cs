using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.Common.IPageData.ClientTask;

namespace Devbazaar.Common.PageData.ClientTask
{
	public class ClientTaskPage : Page, IClientTaskPage
	{
		// filter
		public int LowPrice { get; set; } = 0;
		public int HighPrice { get; set; } = int.MaxValue;

		// sort
		public bool? OldestDate { get; set; } = null;
	}
}
