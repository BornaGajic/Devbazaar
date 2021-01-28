using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Devbazaar.IRestModels.IClientTaskRest
{
	public interface ICreateClientTaskRest
	{
		string Description { get; set; }
		int LowPrice { get; set; }
		int HighPrice { get; set; }
	}
}
