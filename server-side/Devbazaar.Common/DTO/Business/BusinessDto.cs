using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.Common.IDTO.Business;
using Devbazaar.Model.Common;

namespace Devbazaar.Common.DTO.Business
{
	public class BusinessDto : IBusinessDto
	{
		public Guid Id { get; set; }
		public string Username { get; set; }
		public string Email { get; set; }
		public string Description { get; set; }
		public string About { get; set; }
		public string Website { get; set; }
		public bool Available { get; set; }
		public bool IsFavourited { get; set; } = false;
		public string Country { get; set; }
		public string City { get; set; }
		public int PostalCode { get; set; }
		public int Popularity { get; set; }
		public List<ICategory> Categories { get; set; } = null;
	}
}
