using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.Model.Common;

namespace Devbazaar.Model
{
	public class ClientTask : IClientTask
	{
		public Guid Id { get; set; }
		public string Description { get; set; }
		public int LowPrice { get; set; }
		public int HighPrice { get; set; }
		public DateTime DateAdded { get; set; }

		public Guid ClientId { get; set; }
		public Guid? BusinessId { get; set; }
	}
}
