using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using Devbazaar.Common.DTO.Client;
using Devbazaar.DAL.EntityModels;
using Devbazaar.Model;
using Devbazaar.Model.Common;
using Devbazaar.RestModels.ClientRest;

namespace Devbazaar.AutoMapperProfiles
{
	public class ClientProfile : Profile
	{
		public ClientProfile ()
		{
			CreateMap<UpdateClientRest, IClient>();
			CreateMap<ClientEntity, ClientDto>().ReverseMap();

			CreateMap<IClient, Client>().ReverseMap();
		}
	}
}