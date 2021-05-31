using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.Common.IDTO.ClientTask;

namespace Devbazaar.Common.DTO.ClientTask
{
	public class ClientTaskDto : IClientTaskDto
	{
		public Guid Id { get; set; }
		public Guid ClientId { get; set; }

		public string Username { get; set; }
		public string Email { get; set; }
		public string Description { get; set; }
		public string Title { get; set; }

		public int LowPrice { get; set; }
		public int HighPrice { get; set; }

		public DateTime DateAdded { get; set; }

		public bool? IsPinned { get; set; } = null;
	}
}
