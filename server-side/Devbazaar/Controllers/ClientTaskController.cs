using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using AutoMapper;
using Devbazaar.Common.PageData.ClientTask;
using Devbazaar.Model.Common;
using Devbazaar.RestModels.ClientTaskRest;
using Devbazaar.Service.Common.IClientTaskServices;
using Microsoft.AspNet.Identity;

using static  Devbazaar.Utility.Utility;

namespace Devbazaar.Controllers
{
	[Authorize]
	[RoutePrefix("Devbazaar/Task")]
	public class ClientTaskController : ApiController
	{
		private IClientTaskService ClientTaskService { get; set; }
		private IMapper Mapper { get; set; }

		public ClientTaskController (IMapper mapper, IClientTaskService clientTaskService)
		{
			Mapper = mapper;
			ClientTaskService = clientTaskService;
		}

		[Route("Create")]
		[HttpPost]
		public async Task<HttpResponseMessage> CreateAsync ([FromBody] CreateClientTaskRest newTask)
		{
			var newClientTask = Mapper.Map<IClientTask>(newTask);

			newClientTask.ClientId = Guid.Parse(User.Identity.GetUserId());
			newClientTask.DateAdded = DateTime.Now;

			try
			{
				var result = await ClientTaskService.CreateAsync(newClientTask);

				return Request.CreateResponse(HttpStatusCode.OK, result); 
			}
			catch (Exception e)
			{
				return Request.CreateErrorResponse(HttpStatusCode.BadRequest, e);
			}
		}

		[Route("Update")]
		[HttpPut]
		public async Task<HttpResponseMessage> UpdateAsync ([FromBody] UpdateClientTaskRest updatedTask, [FromUri] Guid taskId)
		{
			var updateClientTask = GenerateUpdateDict(updatedTask);

			try
			{
				await ClientTaskService.UpdateAsync(updateClientTask, taskId);

				return Request.CreateResponse(HttpStatusCode.OK);
			}
			catch (Exception e)
			{
				return Request.CreateErrorResponse(HttpStatusCode.BadRequest, e);
			}
		}


		[Route("Delete")]
		[HttpDelete]
		public async Task<HttpResponseMessage> DeleteAsync ([FromBody] DeleteClientTaskRest task)
		{
			try
			{
				await ClientTaskService.DeleteAsync(task.Id);

				return Request.CreateResponse(HttpStatusCode.OK);    
			}
			catch (Exception e)
			{
				return Request.CreateErrorResponse(HttpStatusCode.BadRequest, e);   
			}
		}

		[Route("Tasks")]
		[HttpPost]
		public async Task<HttpResponseMessage> PaginatedGetAsync ([FromBody] ClientTaskPage pageData)
		{
			try
			{
				var result = await ClientTaskService.PaginatedGetAsync(pageData, null);

				return Request.CreateResponse(HttpStatusCode.OK, result);
			}
			catch (Exception e)
			{
				return Request.CreateErrorResponse(HttpStatusCode.BadRequest, e);
			}
		}
	}
}
