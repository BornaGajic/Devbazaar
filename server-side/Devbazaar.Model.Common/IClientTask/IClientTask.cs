using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Devbazaar.Model.Common
{
	public interface IClientTask
	{
		Guid Id { get; set; }
		string Description { get; set; }
		int LowPrice { get; set; }
		int HighPrice { get; set; }
		DateTime DateAdded { get; set; }

		Guid ClientId { get; set; }
		Guid? BusinessId { get; set; }
	}
}
