using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Devbazaar.IRestModels.IBusinessRest;
using Devbazaar.Model.Common;

namespace Devbazaar.RestModels.BusinessRest
{
	public class UpdateBusinessRest : IUpdateBusinessRest
	{
		public string Description { get; set; } = null;
		public string About { get; set; } = null;
		public string Website { get; set; } = null;
		public bool? Available { get; set; } = null;
		public string Country { get; set; } = null;
		public string City { get; set; } = null;
		public int? PostalCode { get; set; } = null;
	}
}