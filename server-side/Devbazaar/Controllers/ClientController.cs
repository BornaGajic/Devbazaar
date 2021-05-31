using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using AutoMapper;
using Devbazaar.Common.IPageData.Business;
using Devbazaar.Model.Common;
using Devbazaar.RestModels.ClientRest;
using Devbazaar.Service.Common.IClientServices;
using Microsoft.AspNet.Identity;

using static Devbazaar.Utility.Utility;

namespace Devbazaar.Controllers
{
	[Authorize]
	[RoutePrefix("Devbazaar/Client")]
	public class ClientController : ApiController
	{
		public IClientService ClientService { get; set; }
		public IMapper Mapper { get; set; }
	
		public ClientController (IClientService clientService, IMapper mapper)
		{
			ClientService = clientService;
			Mapper = mapper;
		}

		[HttpGet]
		[Route("Data")]
		public async Task<HttpResponseMessage> GetClientDataById ()
		{
			return Request.CreateResponse(HttpStatusCode.OK, await ClientService.GetClientDataById(Guid.Parse(User.Identity.GetUserId())));
		}

		[HttpGet]
		[Route("Favourites")]
		public async Task<HttpResponseMessage> GetFavouriteBusinesses ()
		{
			Guid id = Guid.Parse(User.Identity.GetUserId());

			try
			{
				var favouriteBusinesses = await ClientService.GetFavouriteBusinesses(id);

				return Request.CreateResponse(HttpStatusCode.OK, favouriteBusinesses);
			}
			catch (Exception e)
			{
				return Request.CreateErrorResponse(HttpStatusCode.BadRequest, e);
			}
		}

		/// <summary>
		/// Gets the users task list
		/// </summary>
		/// <returns>List of IClientTasks</returns>
		[HttpGet]
		[Route("Tasks")]
		public async Task<HttpResponseMessage> GetTasks ()
		{
			Guid id = Guid.Parse(User.Identity.GetUserId());

			var tasks = await ClientService.GetTasks(id);

			return Request.CreateResponse(HttpStatusCode.OK, tasks);
		}

		[HttpPut]
		[Route("Update")]
		public async Task<HttpResponseMessage> UpdateAsync ([FromBody] UpdateClientRest changedClient)
		{
			var updateClient = GenerateUpdateDict(changedClient);    

			Guid clientId = Guid.Parse(User.Identity.GetUserId());

			try
			{
				await ClientService.UpdateAsync(updateClient, clientId);

				 return Request.CreateResponse(HttpStatusCode.OK);
			}
			catch (Exception e)
			{
				return Request.CreateErrorResponse(HttpStatusCode.BadRequest, e);
			}
		}
		
		[HttpPut]
		[Route("AddFavourites")]
		public async Task<HttpResponseMessage> AddBusinessToFavourites ([FromUri] Guid businessId)
		{   
			try
			{
				var result = await ClientService.AddToFavourites(Guid.Parse(User.Identity.GetUserId()), businessId);

				return Request.CreateResponse(HttpStatusCode.OK, result);
			}
			catch (Exception e)
			{
				return Request.CreateErrorResponse(HttpStatusCode.BadRequest, e);
			}
		}

		[HttpPut]
		[Route("RemoveFavourite")]
		public async Task<HttpResponseMessage> RemoveBusinessFromFavourites ([FromUri] Guid businessId)
		{
			Guid clientId = Guid.Parse(User.Identity.GetUserId());

			try
			{
				await ClientService.RemoveFromFavourites(clientId, businessId);

				return Request.CreateResponse(HttpStatusCode.OK);
			}
			catch (Exception e)
			{
				return Request.CreateErrorResponse(HttpStatusCode.BadRequest, e.Message);
			}
		}
	}
}
