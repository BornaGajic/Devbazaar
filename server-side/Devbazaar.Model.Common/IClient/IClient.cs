using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Devbazaar.Model.Common
{
	public interface IClient
	{
		List<IClientTask> Tasks { get; set; }
		List<IBusiness> Businesses { get; set; }
	}
}
