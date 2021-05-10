using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Devbazaar.Common.IPageData.ClientTask
{
	public interface IClientTaskReturnType
	{
		string Description { get; set; }
		int LowPrice { get; set; }
		int HighPrice { get; set; }
		DateTime DateAdded { get; set; }
		string Username { get; set; }
		string Email { get; set; }
		Guid? ClientId { get; set; }
		Guid? Id { get; set; }
	}
}
