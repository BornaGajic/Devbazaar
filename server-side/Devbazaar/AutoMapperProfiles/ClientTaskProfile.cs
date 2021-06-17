using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using Devbazaar.DAL.EntityModels;
using Devbazaar.RestModels.ClientTaskRest;
using Devbazaar.Model.Common;
using Devbazaar.Model;
using Devbazaar.Common.DTO.ClientTask;

namespace Devbazaar.AutoMapperProfiles
{
	public class ClientTaskProfile : Profile
	{
		public ClientTaskProfile ()
		{
			CreateMap<CreateClientTaskRest, IClientTask>();
			CreateMap<UpdateClientTaskRest, IClientTask>();
			CreateMap<IClientTask, TaskEntity>().ReverseMap();
			CreateMap<ClientTask, IClientTask>().ReverseMap();
			CreateMap<TaskEntity, ClientTaskDto>();
		}
	}
}