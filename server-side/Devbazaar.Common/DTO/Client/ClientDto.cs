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
		public List<IClientTask> MyTasks { get; set; }
		public List<IBusiness> FavBusinesses { get; set; }
	}
}
