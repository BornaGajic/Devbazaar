using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Devbazaar.Model.Common
{
	public interface IBusiness
	{
		Guid Id { get; set; }
		string Description { get; set; }
		string About { get; set; }
		string Website { get; set; }
		string Country { get; set; }
		string City { get; set; }
		bool Available { get; set; }

		List<ICategory> Categories { get; set; }
	}
}
