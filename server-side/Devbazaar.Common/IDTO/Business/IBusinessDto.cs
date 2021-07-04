using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.Model.Common;

namespace Devbazaar.Common.IDTO.Business
{
	public interface IBusinessDto : IBusiness
	{
		string Username { get; set; }
		string Email { get; set; }
		byte[] Image { get; set; }

		bool IsFavourited { get; set; }

		int Popularity { get; set; } // count of client favourites
	}
}
