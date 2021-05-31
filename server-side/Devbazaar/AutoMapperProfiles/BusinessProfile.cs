using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using Devbazaar.Common.DTO.Business;
using Devbazaar.Common.IDTO.Business;
using Devbazaar.Common.PageData.Business;
using Devbazaar.DAL.EntityModels;
using Devbazaar.Model;
using Devbazaar.Model.Common;
using Devbazaar.RestModels.BusinessRest;

namespace Devbazaar.AutoMapperProfiles
{
	public class BusinessProfile : Profile
	{
		public BusinessProfile ()
		{
			CreateMap<CreateBusinessRest, IBusiness>();
			CreateMap<IBusiness, BusinessEntity>().ReverseMap();

			CreateMap<UpdateBusinessRest, IBusiness>();

			CreateMap<BusinessDto, IBusinessDto>();
		}
	}
}