using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using AutoMapper;
using Devbazaar.Common.PageData.Business;
using Devbazaar.Common.PageData.ClientTask;
using Devbazaar.Model.Common;
using Devbazaar.RestModels.BusinessRest;
using Devbazaar.Service.Common.IBusinessServices;
using Microsoft.AspNet.Identity;

using static Devbazaar.Utility.Utility;

namespace Devbazaar.Controllers
{
	[Authorize]
	[RoutePrefix("Devbazaar/Business")]
	public class BusinessController : ApiController
	{
		IBusinessService BusinessService { get; set; }
		IMapper Mapper { get; set; }

		public BusinessController (IBusinessService businessService, IMapper mapper)
		{
			BusinessService = businessService;
			Mapper = mapper;
		}

		[HttpGet]
		[Route("Data")]
		public async Task<HttpResponseMessage> GetBusinessDataById ()
		{
			try
			{
				return Request.CreateResponse(HttpStatusCode.OK, await BusinessService.GetBusinessDataById(Guid.Parse(User.Identity.GetUserId())));
			}
			catch (Exception e)
			{
				return Request.CreateErrorResponse(HttpStatusCode.BadRequest, e);
			}
		}

		[HttpPost]
		[Route("Create")]
		public async Task<HttpResponseMessage> CreateAsync ([FromBody] CreateBusinessRest createBusinessRest)
		{
			var business = Mapper.Map<IBusiness>(createBusinessRest);

			List<ICategory> categories = Mapper.Map<List<ICategory>>(createBusinessRest.Categories); 

			try
			{
				Guid userId = Guid.Parse(User.Identity.GetUserId());

				await BusinessService.CreateAsync(business, categories, userId);

				return  Request.CreateResponse(HttpStatusCode.OK, createBusinessRest);
			}
			catch (Exception e)
			{
				return Request.CreateErrorResponse(HttpStatusCode.BadRequest, e);
			}
		}

		[HttpPut]
		[Route("Update")]
		public async Task<HttpResponseMessage> UpdateAsync ([FromBody] UpdateBusinessRest updateBusinessRest)
		{
			var updateBusiness = GenerateUpdateDict(updateBusinessRest);

			Guid businessId = Guid.Parse(User.Identity.GetUserId());

			try
			{
				await BusinessService.UpdateAsync(updateBusiness, businessId);

				return Request.CreateResponse(HttpStatusCode.OK);
			}
			catch (Exception e)
			{
				return Request.CreateErrorResponse(HttpStatusCode.BadRequest, e);
			}
		}

		[HttpPut]
		[Route("AddCategory")]
		public async Task<HttpResponseMessage> AddCategoryAsync ([FromUri] Guid categoryId)
		{
			Guid businessId = Guid.Parse(User.Identity.GetUserId());

			try
			{
				await BusinessService.AddCategoryAsync(businessId, categoryId);

				return Request.CreateResponse(HttpStatusCode.OK);
			}
			catch (Exception e)
			{
				return Request.CreateErrorResponse(HttpStatusCode.BadRequest, e);
			}
		}

		[HttpPut]
		[Route("RemoveCategory")]
		public async Task<HttpResponseMessage> RemoveCategoryAsync ([FromUri] Guid categoryId)
		{
			Guid businessId = Guid.Parse(User.Identity.GetUserId());

			try
			{
				await BusinessService.RemoveCategoryAsync(businessId, categoryId);

				return Request.CreateResponse(HttpStatusCode.OK);
			}
			catch (Exception e)
			{
				return Request.CreateErrorResponse(HttpStatusCode.BadRequest, e);
			}
		}

		[HttpPut]
		[Route("Acquire")]
		public async Task<HttpResponseMessage> AcquireClientTaskAsync ([FromUri] Guid clientTaskId)
		{
			Guid businessId = Guid.Parse(User.Identity.GetUserId());
			
			try
			{
				var result = await BusinessService.AcquireClientTaskAsync(businessId, clientTaskId);

				return Request.CreateResponse(HttpStatusCode.OK, result);
			}
			catch (Exception e)
			{
				return Request.CreateErrorResponse(HttpStatusCode.BadRequest, e);
			}
		}

		[HttpPut]
		[Route("RemovePinnedTask")]
		public async Task<HttpResponseMessage> RemovePinnedTaskAsync ([FromUri] Guid clientTaskId)
		{
			Guid businessId = Guid.Parse(User.Identity.GetUserId());

			try
			{
				await BusinessService.RemovePinnedTaskAsync(businessId, clientTaskId);
				return Request.CreateResponse(HttpStatusCode.OK);
			}
			catch (Exception e)
			{
				return Request.CreateErrorResponse(HttpStatusCode.BadRequest, e);
			}
		}

		/// <summary>
		/// If <c>pageData</c> is null then all records are returned
		/// </summary>
		[HttpPost]
		[Route("Tasks")]
		public async Task<HttpResponseMessage> AcquiredClientTasks ([FromBody] ClientTaskPage pageData = null)
		{
			Guid businessId = Guid.Parse(User.Identity.GetUserId());

			try
			{
				if (pageData == null)
				{
					var pinnedTasks = await BusinessService.PinnedClientTasksAsync(businessId);

					return Request.CreateResponse(HttpStatusCode.OK, pinnedTasks);
				}
				else
				{
					var result = await BusinessService.PaginatedAcquiredClientTasksAsync(pageData, businessId);

					return Request.CreateResponse(HttpStatusCode.OK, result);
				}
			}
			catch (Exception e)
			{
				return Request.CreateErrorResponse(HttpStatusCode.BadRequest, e);
			}  
		}

		[HttpPost]
		[Route("Businesses")]
		public async Task<HttpResponseMessage> PaginatedGetAsync ([FromBody] BusinessPage pageData)
		{
			if (User.IsInRole("Client"))
			{
				Guid clientId = Guid.Parse(User.Identity.GetUserId());
				try
				{
					var businessList = await BusinessService.PaginatedGetAsync(pageData, clientId);
					businessList.RemoveAll(x => x.Id == clientId);

					return Request.CreateResponse(HttpStatusCode.OK, businessList);
				}
				catch (Exception e)
				{
					return Request.CreateErrorResponse(HttpStatusCode.BadRequest, e);
				}
			}
			
			try
			{
				var result = await BusinessService.PaginatedGetAsync(pageData);

				return Request.CreateResponse(HttpStatusCode.OK, result);            
			}
			catch (Exception e)
			{
				return Request.CreateErrorResponse(HttpStatusCode.BadRequest, e);
			}
		}

		[HttpGet]
		[Route("Categories")]
		public async Task<HttpResponseMessage> GetCategories ()
		{
			var categories = await BusinessService.GetCategories();

			return Request.CreateResponse(HttpStatusCode.OK, categories);
		}
	}
}
