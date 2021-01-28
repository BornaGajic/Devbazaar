using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Devbazaar.Common.PageData.ClientTask
{
	public class ClientTaskPage : Page
	{
		// filter
		public int LowPrice { get; set; } = 0;
		public int HighPrice { get; set; } = int.MaxValue;

		// sort
		public bool? OldestDate { get; set; } = null;
	}
}
