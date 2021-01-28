using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using Devbazaar.DAL.EntityModels;
using Devbazaar.Model;
using Devbazaar.Model.Common;

namespace Devbazaar.AutoMapperProfiles
{
	public class CategoryProfile : Profile
	{
		public CategoryProfile ()
		{
			CreateMap<Category, ICategory>().ReverseMap();
			CreateMap<ICategory, CategoryEntity>().ReverseMap();
		}
	}
}