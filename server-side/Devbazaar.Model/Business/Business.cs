using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.Model.Common;

namespace Devbazaar.Model
{
	public class Business : User, IBusiness
	{
		public string Description { get; set; }
		public string About { get; set; }
		public string Website { get; set; }
		public string Country { get; set; }
		public string City { get; set; }
		public bool Available { get; set; }

		public List<ICategory> Categories { get; set; }
	}
}
