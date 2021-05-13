using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Devbazaar.IRestModels.IClientRest;

namespace Devbazaar.RestModels.ClientRest
{
	public class UpdateClientRest : IUpdateClientRest
	{
		public string About { get; set; } = null;
		public string Website { get; set; } = null;
		public string Country { get; set; } = null;
		public string City { get; set; } = null;
		public int? PostalCode { get; set; } = null;
	}
}