using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.DAL.EntityModels;
using Devbazaar.Repository.Common.Repositories;
using Devbazaar.DAL.Context;
using Devbazaar.Common.IPageData.ClientTask;
using Devbazaar.Common.PageData.ClientTask;

namespace Devbazaar.Repository.Repositories
{
	public class ClientTaskRepository : BaseRepository<TaskEntity>, IClientTaskRepository
	{
		public ClientTaskRepository (DevbazaarDbContext context) : base(context)
		{
		}

		public async Task<TaskEntity> GetByIdAsync (Guid id)
		{
			var clientTaskList = from clientTask in Table where clientTask.Id == id select clientTask;

			return await Task.Run(() => { return clientTaskList.First(); })  ?? null;
		}

		public async Task<TaskEntity> UpdateAsync (Dictionary<string, object> item, Guid clientTaskId)
		{
			TaskEntity entity;
			try
			{
				 entity = await (from task in Table where task.Id == clientTaskId select task).SingleAsync();

				foreach (var prop in typeof(TaskEntity).GetProperties())
				{
					if (item.ContainsKey(prop.Name))
					{
						prop.SetValue(entity, item[prop.Name]);
					}
				}
			}
			catch (Exception e)
			{
				Console.WriteLine(e.Message);

				return null;
			}

			return entity;
		}

		public async Task<List<TaskEntity>> GetPinnedTasksAsync (Guid businessId)
		{
			var query = from ct in Table where ct.BusinessId == businessId select ct;

			return await query.ToListAsync();
		}

		public async Task<List<IClientTaskReturnType>> PaginatedGetAsync (ClientTaskPage pageData, Guid? clientId = null, Guid? businessId = null)
		{
			var clientTaskEntityList = await ApplyPageSeasoning(pageData, clientId, businessId);

			var clientTaskReturnTypes = new List<IClientTaskReturnType>();

			foreach (var task in clientTaskEntityList)
			{
				clientTaskReturnTypes.Add(
					new ClientTaskReturnType ()
					{
						Description = task.Description,
						LowPrice = task.LowPrice,
						HighPrice = task.HighPrice,
						Username = string.Empty,
						Email = string.Empty,
						DateAdded = task.DateAdded,
						ClientId = task.ClientId,
						Id = task.Id
					}
				);
			}

			return clientTaskReturnTypes;
		}
		private async Task<List<TaskEntity>> ApplyPageSeasoning (ClientTaskPage pageData, Guid? clientId = null, Guid? businessId = null)
		{
			var clientTasksTable = Table;

			var pageItemCount = Utility.Utility.PageItemLimit;

			// filter
			var query = from ct in clientTasksTable 
				  	    where 
							  (ct.LowPrice >= pageData.LowPrice) &&
				 			  (ct.HighPrice <= pageData.HighPrice) &&
							  (clientId != null ? ct.ClientId == clientId : true) &&
							  (businessId != null ? ct.BusinessId == businessId : true)
						select ct;


			Utility.Utility.TotalClientTaskCount = await query.CountAsync();

			// sort
			if (pageData.OldestDate.HasValue)
			{
				query = query.OrderBy(p => DbFunctions.CreateTime(p.DateAdded.Hour, p.DateAdded.Minute, p.DateAdded.Second))
							 .ThenBy(p => DbFunctions.CreateDateTime(p.DateAdded.Year, p.DateAdded.Month, null, null, null, null));
			}
			else
			{
				query = query.OrderByDescending(p => DbFunctions.CreateTime(p.DateAdded.Hour, p.DateAdded.Minute, p.DateAdded.Second))
						     .ThenByDescending(p => DbFunctions.CreateDateTime(p.DateAdded.Year, p.DateAdded.Month, null, null, null, null));
			}

			query = query.Skip((pageData.PageNumber - 1) * pageItemCount).Take(pageItemCount);

			return await query.ToListAsync();
		}
	}
}
