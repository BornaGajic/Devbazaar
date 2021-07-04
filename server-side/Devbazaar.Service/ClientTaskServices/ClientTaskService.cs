using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.Model.Common;
using Devbazaar.Service.Common.IClientTaskServices;
using AutoMapper;
using Devbazaar.Repository.Common;
using Devbazaar.DAL.EntityModels;
using System.Data.Entity;
using Devbazaar.Common.PageData.ClientTask;
using Devbazaar.Common.IPageData.ClientTask;
using Devbazaar.Common.IDTO.ClientTask;

namespace Devbazaar.Service.ClientTaskServices
{
	public class ClientTaskService : IClientTaskService
	{
		IUnitOfWork UnitOfWork { get; set; }		
		IMapper Mapper { get; set; }

		public ClientTaskService (IMapper mapper, IUnitOfWork unitOfWork)
		{
			UnitOfWork = unitOfWork;
			Mapper = mapper;
		}

		public async Task<IClientTask> CreateAsync (IClientTask newTask)
		{
			newTask.Id = Guid.NewGuid();

			try
			{
				await UnitOfWork.AddAsync(Mapper.Map<TaskEntity>(newTask));
			
				await UnitOfWork.CommitAsync<TaskEntity>();
			}
			catch (Exception e)
			{
				throw e;
			}
			
			return newTask;
		}

		public async Task UpdateAsync (Dictionary<string, object> item, Guid clientTaskId)
		{
			try
			{
				var clientTaskEntity = await UnitOfWork.ClientTaskRepository.UpdateAsync(item, clientTaskId);

				await UnitOfWork.UpdateAsync<TaskEntity>(clientTaskEntity);
				await UnitOfWork.CommitAsync<TaskEntity>();
			}
			catch (Exception e)
			{
				throw e;
			}
		}

		public async Task DeleteAsync (Guid taskId)
		{
			try
			{
				var clientTaskEntity = await UnitOfWork.ClientTaskRepository.GetByIdAsync(taskId);

				await UnitOfWork.DeleteAsync<TaskEntity>(Mapper.Map<TaskEntity>(clientTaskEntity));
				await UnitOfWork.CommitAsync<TaskEntity>();
			}
			catch (Exception e)
			{
				throw e;
			}
		}


		/// <summary>
		/// If curent users role is business, check if a task is pinned by that business
		/// </summary>
		public async Task<List<IClientTaskDto>> PaginatedGetAsync (ClientTaskPage pageData, Guid? businessId = null)
		{
			var clientTaskDto = await UnitOfWork.ClientTaskRepository.PaginatedGetAsync(pageData, null);	
			var businessEntity = businessId != null ? await UnitOfWork.BusinessRepository.GetByIdAsync(businessId.Value) : null;

			var userTable = UnitOfWork.UserRepository.TableAsNoTracking;

			foreach (var clientTask in clientTaskDto)
			{
				var userEntity = await (from user in userTable where clientTask.ClientId == user.Id select user).SingleAsync();

				clientTask.Email = userEntity.Email;
				clientTask.Username = userEntity.Username;
				clientTask.Image = userEntity.Image;

				if (businessEntity != null)
				{
					clientTask.IsPinned = businessEntity?.Tasks.FirstOrDefault(ct => ct.Id == clientTask.Id) != default;
				}
			}

			return clientTaskDto;
		}
	}
}
