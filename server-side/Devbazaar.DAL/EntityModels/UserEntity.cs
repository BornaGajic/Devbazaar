using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.DAL.IEntityModels;

namespace Devbazaar.DAL.EntityModels
{
	public class UserEntity : BaseEntity, IUserEntity
	{
		public string Username { get; set; }
		public string Password { get; set; }
		public string Email { get; set; }
		public string Logo { get; set; }

		public virtual ClientEntity Client { get; set; }
		public virtual BusinessEntity Business { get; set; }
	}
}
