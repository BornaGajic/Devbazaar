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
		public List<IClientTask> Tasks { get; set; }
		public List<IBusiness> Businesses { get; set; }
	}
}
