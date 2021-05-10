using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.Common.IPageData.ClientTask;

namespace Devbazaar.Common.PageData.ClientTask
{
	public class ClientTaskReturnType : IClientTaskReturnType
	{
		public string Description { get; set; }
		public int LowPrice { get; set; }
		public int HighPrice { get; set; }
		public DateTime DateAdded { get; set; }
		public string Username { get; set; }
		public string Email { get; set; }
		public Guid? ClientId { get; set; }
		public Guid? Id { get; set; }
	}
}
