using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.Common.DTO.Client;
using Devbazaar.Common.DTO.Business;

namespace Devbazaar.Common.DTO.User
{
	public class UserDto
	{
		public ClientDto clientDto;
		public BusinessDto businessDto;

		public string Token;
	}
}
