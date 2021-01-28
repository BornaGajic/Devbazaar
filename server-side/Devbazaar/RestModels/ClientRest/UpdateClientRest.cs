using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Devbazaar.IRestModels.IClientRest;

namespace Devbazaar.RestModels.ClientRest
{
	public class UpdateClientRest : IUpdateClientRest
	{
		public string FirstName { get; set; }
		public string LastName { get; set; }
	}
}