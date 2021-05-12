using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.Model.Common;

namespace Devbazaar.Model
{
	public class Client : User, IClient
	{
		public string About { get; set; }
		public string Website { get; set; }
		public string Country { get; set; }
		public string City { get; set; }
		public int PostalCode { get; set; }

		public List<IClientTask> Tasks { get; set; }
		public List<IBusiness> Businesses { get; set; }
	}
}
