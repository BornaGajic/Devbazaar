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

            string token;
            try
            {
                token = await UserService.CreateAsync(user, tou);

                if (token == "User already exists")
                {
                    return Request.CreateResponse(HttpStatusCode.Conflict, token);
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);

                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            } 

            return Request.CreateResponse(HttpStatusCode.OK, token);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("Login")]
        public async Task<HttpResponseMessage> LoginAsync ([FromBody] LoginRest loginData)
        {
            var user = Mapper.Map<IUser>(loginData);

            try
            {
                string token = await UserService.LoginAsync(user);

                return string.IsNullOrEmpty(token) ? Request.CreateResponse(HttpStatusCode.NotFound) : Request.CreateResponse(HttpStatusCode.OK, token);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                
                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }
        }

        [Authorize]
        [HttpPut]
        [Route("Update")]
        public async Task<HttpResponseMessage> UpdateAsync ([FromBody] UpdateUserRest updateData)
        {
            var changedValues = new Dictionary<string, object>();
            foreach (var property in typeof(UpdateUserRest).GetProperties())
            {
                var value = property.GetValue(updateData);
                if (value != null)
                {
                    changedValues[property.Name] = property.GetValue(updateData);
                }
            }
            var X = User.Identity.GetUserId();
            var userId = Guid.Parse(X);

            var result = await UserService.UpdateAsync(changedValues, userId);

            if (result != false)
            {
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
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
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);

                return Request.CreateResponse(HttpStatusCode.BadRequest, e.Message);
            }

            return new HttpResponseMessage(HttpStatusCode.OK);
        }
    }
}
