using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using AutoMapper;
using Devbazaar.Model.Common.IUser;
using Devbazaar.RestModels.UserRest;
using Devbazaar.Service.Common.IUserServices;
using Microsoft.AspNet.Identity;
using static Devbazaar.Utility.Utility;
using IUser = Devbazaar.Model.Common.IUser.IUser;

namespace Devbazaar.Controllers
{
	[RoutePrefix("Devbazaar/User")]
	public class UserController : ApiController
	{
		protected IUserService UserService { get; set; }
		protected IMapper Mapper { get; set; }

		public UserController (IUserService userService, IMapper mapper)
		{
			 UserService = userService;
			 Mapper = mapper;
		}

		[AllowAnonymous]
		[HttpPost]
		[Route("Register")]
		public async Task<HttpResponseMessage> CreateAsync ([FromBody] CreateUserRest newUser, [FromUri] TypeOfUser tou)
		{
			var user = Mapper.Map<IUser>(newUser);

			try
			{
				string token = await UserService.CreateAsync(user, tou);

				return Request.CreateResponse(HttpStatusCode.OK, token);
			}
			catch (Exception e)
			{
				if (e.Message == "User already exists")
				{
					return Request.CreateErrorResponse(HttpStatusCode.Conflict, e);	
				}

				return Request.CreateErrorResponse(HttpStatusCode.BadRequest, e);
			} 
		}

		[AllowAnonymous]
		[HttpPost]
		[Route("Login")]
		public async Task<HttpResponseMessage> LoginAsync ([FromBody] LoginRest loginData)
		{
			var user = Mapper.Map<IUser>(loginData);

			try
			{
				var token = await UserService.LoginAsync(user);

				return Request.CreateResponse(HttpStatusCode.OK, token);
													
			}
			catch (Exception e)
			{
				return Request.CreateErrorResponse(HttpStatusCode.BadRequest, e);
			}
		}

		[Authorize]
		[HttpPut]
		[Route("Update")]
		public async Task<HttpResponseMessage> UpdateAsync ([FromBody] UpdateUserRest updateData)
		{
			var updateUser = GenerateUpdateDict(updateData);
			var userId = Guid.Parse(User.Identity.GetUserId());

			try
			{
				await UserService.UpdateAsync(updateUser, userId);

				return Request.CreateResponse(HttpStatusCode.OK);
			}
			catch (Exception e)
			{
				return Request.CreateErrorResponse(HttpStatusCode.BadRequest, e);
			}
		}

		[Authorize]
		[HttpDelete]
		[Route("Delete")]
		public async Task<HttpResponseMessage> DeleteAsync ([FromBody] DeleteUserRest deleteUser)
		{
			var user = Mapper.Map<IUser>(deleteUser);

			try
			{
				await UserService.DeleteAsync(user);

				return Request.CreateResponse(HttpStatusCode.OK);
			}
			catch (Exception e)
			{
				return Request.CreateErrorResponse(HttpStatusCode.BadRequest, e);
			}
		}
	}
}
