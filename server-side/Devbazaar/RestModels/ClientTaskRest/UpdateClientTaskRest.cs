using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using Devbazaar.IRestModels.IClientTaskRest;

namespace Devbazaar.RestModels.ClientTaskRest
{
	public class UpdateClientTaskRest : IUpdateClientTaskRest
	{
		public string Description { get; set; } = null;
		public int? LowPrice { get; set; } = null;
		public int? HighPrice { get; set; } = null;

		public Guid? BusinessId { get; set; } = null; // wtf
	}
}