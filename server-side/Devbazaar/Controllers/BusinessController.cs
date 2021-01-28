using System;
using System.Collections.Generic;
using System.Linq;
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

namespace Devbazaar.Controllers
{
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

        [Authorize]
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
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return Request.CreateResponse(HttpStatusCode.BadRequest, string.Empty);
            }

            return Request.CreateResponse(HttpStatusCode.OK, createBusinessRest);
        }

        [Authorize]
        [HttpPut]
        [Route("Update")]
        public async Task<HttpResponseMessage> UpdateAsync ([FromBody] UpdateBusinessRest updateBusinessRest)
        {
            var updatedBusiness = new Dictionary<string, object>();
            foreach (var property in typeof(UpdateBusinessRest).GetProperties())
            {
                var value = property.GetValue(updateBusinessRest);
                if (value != null)
                {
                    updatedBusiness[property.Name] = property.GetValue(updateBusinessRest);
                }
            }

            Guid businessId = Guid.Parse(User.Identity.GetUserId());

            try
            {
                await BusinessService.UpdateAsync(updatedBusiness, businessId);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return new HttpResponseMessage(HttpStatusCode.BadRequest);
            }

            return new HttpResponseMessage(HttpStatusCode.OK);
        }

        [Authorize]
        [HttpPut]
        [Route("Acquire")]
        public async Task<HttpResponseMessage> AcquireClientTaskAsync ([FromUri] Guid clientTaskId)
        {
            Guid businessId = Guid.Parse(User.Identity.GetUserId());

            if (await BusinessService.AcquireClientTaskAsync(businessId, clientTaskId))
            {
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            
            return Request.CreateResponse(HttpStatusCode.InternalServerError);
        }

        [Authorize]
        [HttpGet]
        [Route("Tasks")]
        public async Task<HttpResponseMessage> AcquiredClientTasks ([FromBody] ClientTaskPage pageData)
        {
            Guid businessId = Guid.Parse(User.Identity.GetUserId());

            return Request.CreateResponse(HttpStatusCode.OK, await BusinessService.AcquiredClientTasksAsync(pageData, businessId));
        }

		[AllowAnonymous]
		[HttpGet]
		[Route("Businesses")]
		public async Task<HttpResponseMessage> PaginatedGetAsync ([FromBody] BusinessPage pageData)
		{
            return Request.CreateResponse(HttpStatusCode.OK, await BusinessService.PaginatedGetAsync(pageData));
		}

        /* TO-DO:
         * `Popular this week` -> popularity by number of times a business was favourited. Updates by itself every week.
         * Add option to update business categories.
         */
	}
}
