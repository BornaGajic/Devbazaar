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

            var result = await ClientTaskService.CreateAsync(newClientTask);
            if (result != null)
            {
                return Request.CreateResponse(HttpStatusCode.OK, result); 
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

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

        [Route("Tasks")]
        [HttpPost]
        public async Task<HttpResponseMessage> PaginatedGetAsync ([FromBody] ClientTaskPage pageData)
        {
            Guid clientId = Guid.Parse(User.Identity.GetUserId());
            
            /*
            object returnDto = new {
               pageResult =   
               totalItems = Utility.Utility.TotalClientTaskCount
            };
            */

             var result = await ClientTaskService.PaginatedGetAsync(pageData, clientId);

            return Request.CreateResponse(HttpStatusCode.OK, result);
        }
    }
}
