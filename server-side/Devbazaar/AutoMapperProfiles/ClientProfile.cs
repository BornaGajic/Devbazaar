using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using Devbazaar.Model.Common;
using Devbazaar.RestModels.ClientRest;

namespace Devbazaar.AutoMapperProfiles
{
	public class ClientProfile : Profile
	{
		public ClientProfile ()
		{
			CreateMap<UpdateClientRest, IClient>();
		}
	}
}