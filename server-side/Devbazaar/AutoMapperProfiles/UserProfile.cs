using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using Devbazaar.DAL.EntityModels;
using Devbazaar.Model.Common.IUser;
using Devbazaar.RestModels.UserRest;

namespace Devbazaar.AutoMapperProfiles
{
	public class UserProfile : Profile
	{
		public UserProfile ()
		{
			CreateMap<IUser, UserEntity>();

			CreateMap<CreateUserRest, IUser>();
			CreateMap<LoginRest, IUser>();
			CreateMap<UpdateUserRest, IUser>();
			CreateMap<DeleteUserRest, IUser>();
		}
	}
}