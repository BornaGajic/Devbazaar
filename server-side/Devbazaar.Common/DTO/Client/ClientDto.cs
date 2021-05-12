using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.Model.Common;

namespace Devbazaar.Common.DTO.Client
{
	public class ClientDto
	{
		public string About { get; set; }
		public string Website { get; set; }
		public string Country { get; set; }
		public string City { get; set; }
		public int PostalCode { get; set; }
		public List<IClientTask> MyTasks { get; set; }
		public List<IBusiness> FavBusinesses { get; set; }
	}
}
