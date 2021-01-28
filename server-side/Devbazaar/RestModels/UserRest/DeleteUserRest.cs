using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Devbazaar.IRestModels.IUserRest;

namespace Devbazaar.RestModels.UserRest
{
	public class DeleteUserRest : IDeleteUserRest
	{
		public string Email { get; set; }
		public string Username { get; set; }
	}
}