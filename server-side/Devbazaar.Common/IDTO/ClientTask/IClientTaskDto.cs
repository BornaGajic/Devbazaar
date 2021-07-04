using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.Model.Common;

namespace Devbazaar.Common.IDTO.ClientTask
{
	public interface IClientTaskDto : IClientTask
	{
		string Username { get; set; }
		string Email { get; set; }
		byte[] Image { get; set; }

		bool? IsPinned { get; set; }
	}
}
