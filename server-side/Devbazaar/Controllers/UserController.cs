using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
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
	[RoutePrefix("User")]
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
		public async Task<HttpResponseMessage> UpdateAsync ([FromBody] UpdateUserRest updateData, [FromUri] TypeOfUser tou)
		{
			var updateUser = GenerateUpdateDict(updateData);
			var userId = Guid.Parse(User.Identity.GetUserId());

			try
			{
				var user = await UserService.UpdateAsync(updateUser, userId);
				
				var newToken = UserService.GenerateToken(user, tou);

				return Request.CreateResponse(HttpStatusCode.OK, newToken);
			}
			catch (Exception e)
			{
				return Request.CreateErrorResponse(HttpStatusCode.BadRequest, e);
			}
		}

		[Authorize]
		[HttpPost]
		[Route("AddImage")]
		public async Task<HttpResponseMessage> AddImageAsync ()
		{
			var userId = Guid.Parse(User.Identity.GetUserId());

			using (var ms = new MemoryStream())
			{
				await Request.Content.ReadAsMultipartAsync<MultipartMemoryStreamProvider>(new MultipartMemoryStreamProvider())
				.ContinueWith(task => {

					MultipartMemoryStreamProvider provider = task.Result;

					foreach (HttpContent content in provider.Contents)
					{
						Stream stream = content.ReadAsStreamAsync().Result;
						Image image = Image.FromStream(stream);

						image.Save(ms, image.RawFormat);
					}
				});
				
				await UserService.AddImageAsync(ms.ToArray(), userId);
			}

			return Request.CreateResponse(HttpStatusCode.OK);
		}

		[Authorize]
		[HttpGet]
		[Route("GetImage")]
		public async Task<HttpResponseMessage> GetImageAsync ()
		{
			var userId = Guid.Parse(User.Identity.GetUserId());

			var image = await UserService.GetImageAsync(userId);

			return Request.CreateResponse(HttpStatusCode.OK, image);
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
