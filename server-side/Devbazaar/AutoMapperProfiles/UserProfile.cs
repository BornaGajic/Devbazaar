using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using Devbazaar.Common.DTO.User;
using Devbazaar.DAL.EntityModels;
using Devbazaar.Model;
using Devbazaar.Model.Common.IUser;
using Devbazaar.RestModels.UserRest;

namespace Devbazaar.AutoMapperProfiles
{
	public class UserProfile : Profile
	{
		public UserProfile ()
		{
			CreateMap<IUser, UserEntity>().ReverseMap();
			CreateMap<User, UserEntity>().ReverseMap();

			CreateMap<CreateUserRest, IUser>();
			CreateMap<LoginRest, IUser>();
			CreateMap<UpdateUserRest, IUser>();
			CreateMap<DeleteUserRest, IUser>();

			CreateMap<ClientEntity, UserDto>();
		}
	}
}