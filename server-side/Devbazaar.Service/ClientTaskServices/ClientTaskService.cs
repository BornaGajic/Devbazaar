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

		public async Task<bool> CreateAsync (IClientTask newTask)
		{
			newTask.Id = Guid.NewGuid();

			try
			{
				await UnitOfWork.AddAsync<TaskEntity>(Mapper.Map<TaskEntity>(newTask));
			}
			catch (Exception e)
			{
				Console.WriteLine(e.Message);
				return false;
			}

			await UnitOfWork.CommitAsync<TaskEntity>();
			
			return true;
		}

		public async Task<bool> UpdateAsync (Dictionary<string, object> item, Guid clientTaskId)
		{
			try
			{
				var clientTaskEntity = await UnitOfWork.ClientTaskRepository.UpdateAsync(item, clientTaskId);

				await UnitOfWork.UpdateAsync<TaskEntity>(clientTaskEntity);
				await UnitOfWork.CommitAsync<TaskEntity>();
			}
			catch (Exception e)
			{
				Console.WriteLine(e.Message);

				return false;
			}
			
			return true;
		}

		public async Task<bool> DeleteAsync (Guid taskId)
		{
			try
			{
				var clientTaskEntity = await UnitOfWork.ClientTaskRepository.GetByIdAsync(taskId);

				await UnitOfWork.DeleteAsync<TaskEntity>(Mapper.Map<TaskEntity>(clientTaskEntity));
			}
			catch (Exception e)
			{
				Console.WriteLine(e.Message);

				return false;
			}

			await UnitOfWork.CommitAsync<TaskEntity>();

			return true;
		}

		public async Task<List<IClientTaskReturnType>> PaginatedGetAsync (ClientTaskPage pageData, Guid? clientId = null)
		{
			var clientTaskReturnTypes = await UnitOfWork.ClientTaskRepository.PaginatedGetAsync(pageData, clientId);	

			var userTable = UnitOfWork.UserRepository.Table;

			foreach (var clientTaskReturnType in clientTaskReturnTypes)
			{
				var userEntity = await (from user in userTable where clientTaskReturnType.ClientId == user.Id select user).SingleAsync();

				clientTaskReturnType.Email = userEntity.Email;
				clientTaskReturnType.Username = userEntity.Username;
			}

			return clientTaskReturnTypes;
		}
	}
}
