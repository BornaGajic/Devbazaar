using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using Devbazaar.DAL.EntityModels;
using Devbazaar.RestModels.ClientTaskRest;
using Devbazaar.Model.Common;

namespace Devbazaar.AutoMapperProfiles
{
	public class ClientTaskProfile : Profile
	{
		public ClientTaskProfile ()
		{
			CreateMap<CreateClientTaskRest, IClientTask>();
			CreateMap<UpdateClientTaskRest, IClientTask>();
			CreateMap<IClientTask, TaskEntity>().ReverseMap();
			
		}
	}
}