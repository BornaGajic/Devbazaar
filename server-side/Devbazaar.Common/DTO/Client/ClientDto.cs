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
		public string FirstName { get; set; }
		public string LastName { get; set; }

		public List<IClientTask> Tasks { get; set; }
		public List<IBusiness> Businesses { get; set; }
	}
}
