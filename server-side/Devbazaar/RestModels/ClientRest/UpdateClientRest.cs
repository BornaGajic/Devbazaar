using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Devbazaar.IRestModels.IClientRest;

namespace Devbazaar.RestModels.ClientRest
{
	public class UpdateClientRest : IUpdateClientRest
	{
		public string About { get; set; }
		public string Website { get; set; }
		public string Country { get; set; }
		public string City { get; set; }
		public int PostalCode { get; set; }
	}
}