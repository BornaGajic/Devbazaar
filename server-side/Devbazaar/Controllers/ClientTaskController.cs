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

namespace Devbazaar.Controllers
{
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

        [Authorize]
        [Route("Create")]
        [HttpPost]
        public async Task<HttpResponseMessage> CreateAsync ([FromBody] CreateClientTaskRest newTask)
        {
            var newClientTask = Mapper.Map<IClientTask>(newTask);

            newClientTask.ClientId = Guid.Parse(User.Identity.GetUserId());
            newClientTask.DateAdded = DateTime.Now;

            if (await ClientTaskService.CreateAsync(newClientTask))
            {
                return Request.CreateResponse(HttpStatusCode.OK); 
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        [Authorize]
        [Route("Update")]
        [HttpPut]
        public async Task<HttpResponseMessage> UpdateAsync ([FromBody] UpdateClientTaskRest updatedTask)
        {
            var item = new Dictionary<string, object>();
            foreach (var property in typeof(UpdateClientTaskRest).GetProperties())
            {
                var value = property.GetValue(updatedTask);
                if (value != null)
                {
                    item[property.Name] = property.GetValue(updatedTask);
                }
            }

            Guid clientTaskId = Guid.Parse(User.Identity.GetUserId());

            if (await ClientTaskService.UpdateAsync(item, clientTaskId))
            {
                return Request.CreateResponse(HttpStatusCode.OK);    
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        [Authorize]
        [Route("Delete")]
        [HttpDelete]
        public async Task<HttpResponseMessage> DeleteAsync ([FromBody] DeleteClientTaskRest task)
        {
            if (await ClientTaskService.DeleteAsync(task.Id))
            {
                return Request.CreateResponse(HttpStatusCode.OK);    
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        [AllowAnonymous]
        [Route("Tasks")]
        [HttpGet]
        public async Task<HttpResponseMessage> PaginatedGetAsync ([FromBody] ClientTaskPage pageData)
        {
            return Request.CreateResponse(HttpStatusCode.OK, await ClientTaskService.PaginatedGetAsync(pageData));
        }

        [Authorize]
        [Route("MyTasks")]
        [HttpGet]
        public async Task<HttpResponseMessage> SelfPaginatedGetASync ([FromBody] ClientTaskPage pageData)
        {
            Guid clientId = Guid.Parse(User.Identity.GetUserId());

            return Request.CreateResponse(HttpStatusCode.OK, await ClientTaskService.PaginatedGetAsync(pageData, clientId));
        }
    }
}
