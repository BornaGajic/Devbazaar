using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Devbazaar.IRestModels.IClientTaskRest;

namespace Devbazaar.RestModels.ClientTaskRest
{
	public class DeleteClientTaskRest : IDeleteClientTaskRest
	{
		public Guid Id { get; set; }
	}
}