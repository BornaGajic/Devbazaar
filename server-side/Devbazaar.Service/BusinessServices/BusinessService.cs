using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.Service.Common.IBusinessServices;
using Devbazaar.Repository.Common;
using Devbazaar.Model.Common;
using AutoMapper;
using Devbazaar.DAL.EntityModels;
using System.Data.Entity;
using Devbazaar.Common.PageData.Business;
using Devbazaar.Common.IDTO.ClientTask;
using Devbazaar.Common.PageData;
using Devbazaar.Common.PageData.ClientTask;
using Devbazaar.Common.DTO.Business;
using static Devbazaar.Utility.Utility;
using Devbazaar.Common.IDTO.Business;
using Devbazaar.Common.DTO.ClientTask;

namespace Devbazaar.Service.BusinessServices
{
	public class BusinessService : IBusinessService
	{
		public IUnitOfWork UnitOfWork { get; set; }
		public IMapper Mapper { get; set; }

		public BusinessService (IUnitOfWork unitOfWork, IMapper mapper)
		{
			UnitOfWork = unitOfWork;
			Mapper = mapper;
		}

		public async Task<IBusinessDto> GetBusinessDataById (Guid id)
		{
			var businessEntity = await UnitOfWork.BusinessRepository.GetByIdAsync(id);	

			IBusinessDto businessDto = new BusinessDto () { 
				Id = businessEntity.Id,
				Description = businessEntity.Description,
				About = businessEntity.About,
				Available = businessEntity.Available,
				City = businessEntity.City,
				Country = businessEntity.Country,
				PostalCode = businessEntity.PostalCode,
				Website = businessEntity.Website,
				Popularity = businessEntity.Clients.Count,
				Categories = Mapper.Map<List<ICategory>>(businessEntity.Categories)
			};

			return businessDto;
		}

		public async Task CreateAsync (IBusiness newBusiness, List<ICategory> categories, Guid userId)
		{
			var businessEntity = Mapper.Map<BusinessEntity>(newBusiness);
			businessEntity.Id = userId;

			if (categories.Count != 0)
			{
				var categoryEntified = Mapper.Map<ICollection<CategoryEntity>>(categories);

				foreach (var category in categoryEntified)
				{
					category.Id = await UnitOfWork.CategoryRepository.GetIdByName(category.Name);

					await UnitOfWork.CategoryRepository.AttachAsync(category);	
				}
			
				businessEntity.Categories = categoryEntified;
			}
			
			try
			{
				await UnitOfWork.AddAsync<BusinessEntity>(businessEntity);
				await UnitOfWork.CommitAsync<BusinessEntity>();
			}
			catch (Exception e)
			{
				throw e;
			}
		}

		public async Task UpdateAsync (Dictionary<string, object> updatedBusiness, Guid businessId)
		{
			var entity = await (from business in UnitOfWork.BusinessRepository.TableAsNoTracking where business.Id == businessId select business).SingleAsync();
			
			UpdateEntityFromDict(entity, updatedBusiness);
			
			try
			{
				await UnitOfWork.UpdateAsync<BusinessEntity>(entity);
				await UnitOfWork.CommitAsync<BusinessEntity>();
			}
			catch (Exception e)
			{
				throw e;
			}
		}

		public async Task AddCategoryAsync (Guid businessId, Guid categoryId)
		{
			var businessEntity = await UnitOfWork.BusinessRepository.GetByIdAsync(businessId);

			businessEntity.Categories.Add(await UnitOfWork.CategoryRepository.GetByIdAsync(categoryId));
		}

		public async Task RemoveCategoryAsync (Guid businessId, Guid categoryId)
		{
			var businessEntity = await UnitOfWork.BusinessRepository.GetByIdAsync(businessId);

			businessEntity.Categories.Remove(await UnitOfWork.CategoryRepository.GetByIdAsync(categoryId));
		}

		public async Task<IClientTaskDto> AcquireClientTaskAsync (Guid businessId, Guid clientTaskId)
		{
			var businessEntity = await UnitOfWork.BusinessRepository.GetByIdAsync(businessId);
			var clientTaskEntity = await UnitOfWork.ClientTaskRepository.GetByIdAsync(clientTaskId);

			try
			{
				businessEntity.Tasks.Add(clientTaskEntity);

				await UnitOfWork.UpdateAsync(businessEntity);
				await UnitOfWork.CommitAsync<BusinessEntity>();
			}
			catch (Exception e)
			{
				throw e;
			}

			IClientTaskDto clientTask = new ClientTaskDto ()
			{
				Description = clientTaskEntity.Description,
				LowPrice = clientTaskEntity.LowPrice,
				HighPrice = clientTaskEntity.HighPrice,
				Username = clientTaskEntity.Client.User.Username,
				Email = clientTaskEntity.Client.User.Email,
				DateAdded = clientTaskEntity.DateAdded,
				ClientId = clientTaskEntity.ClientId,
				Id = clientTaskEntity.Id
			};

			return clientTask;
		}

		public async Task RemovePinnedTaskAsync (Guid businessId, Guid clientTaskId)
		{
			var business = await UnitOfWork.BusinessRepository.GetByIdAsync(businessId);
			var clientTask = await UnitOfWork.ClientTaskRepository.GetByIdAsync(clientTaskId);

			business.Tasks.Remove(clientTask);

			try
			{
				await UnitOfWork.UpdateAsync(business);
				await UnitOfWork.CommitAsync<BusinessEntity>();
			}
			catch (Exception e)
			{
				throw e;
			}
		}

		public async Task<List<ICategory>> GetCategories ()
		{
			var categoriesEntity = await UnitOfWork.CategoryRepository.GetCategories();

			return Mapper.Map<List<ICategory>>(categoriesEntity);
		}

		public async Task<List<IClientTaskDto>> PinnedClientTasksAsync (Guid businessId)
		{
			var businessEntity = await UnitOfWork.BusinessRepository.GetByIdAsync(businessId);
			var pinnedTasks = Mapper.Map<List<IClientTaskDto>>(businessEntity.Tasks);

			var userTable = UnitOfWork.UserRepository.TableAsNoTracking;

			foreach (var clientTask in pinnedTasks)
			{
				var userEntity = await (from user in userTable where clientTask.ClientId == user.Id select user).SingleAsync();

				clientTask.Email = userEntity.Email;
				clientTask.Username = userEntity.Username;
			}

			return pinnedTasks;
		}

		public async Task<List<IClientTaskDto>> PaginatedAcquiredClientTasksAsync (ClientTaskPage pageData, Guid businessId)
		{
			var clientTaskReturnTypes = await UnitOfWork.ClientTaskRepository.PaginatedGetAsync(pageData, null, businessId);

			var userTable = UnitOfWork.UserRepository.TableAsNoTracking;

			foreach (var clientTaskReturnType in clientTaskReturnTypes)
			{
				var userEntity = await (from user in userTable where clientTaskReturnType.ClientId == user.Id select user).SingleAsync();

				clientTaskReturnType.Email = userEntity.Email;
				clientTaskReturnType.Username = userEntity.Username;
			}

			return clientTaskReturnTypes;
		}

		public async Task<List<IBusinessDto>> PaginatedGetAsync (BusinessPage pageData, Guid? clientId = null)
		{
			var businessTable = UnitOfWork.BusinessRepository.TableAsNoTracking;

			var businessList = await ApplyPageSeasoningAsync(pageData);

			List<BusinessEntity> clientFavourites = null;

			// users favorite businesses
			if (clientId != null)
			{
				var clientEntity = await (from client in UnitOfWork.ClientRepository.Table where client.Id == clientId select client).SingleAsync();

				clientFavourites = clientEntity.Businesses.ToList();
			}

			foreach (var business in businessList)
			{
				var categories = businessTable.Where(b => b.Id == business.Id).SelectMany(b => b.Categories);

				business.Categories = Mapper.Map<List<ICategory>>(await categories.ToListAsync());

				if (clientFavourites != null)
				{
					foreach (BusinessEntity b in clientFavourites)
					{
						if (business.Id == b.Id)
						{
							business.IsFavourited = true;
						}
					}
				}
			}

			return Mapper.Map<List<IBusinessDto>>(businessList);
		}

		/// <summary>
		/// Applies filtering and sorting
		/// </summary>
		/// <returns>Maybe filtered and surely sorted</returns>
		private async Task<List<BusinessDto>> ApplyPageSeasoningAsync (BusinessPage pageData)
		{
			var userTable = UnitOfWork.UserRepository.TableAsNoTracking;
			var businessTable = UnitOfWork.BusinessRepository.TableAsNoTracking;

			int pageItemCount = Utility.Utility.PageItemLimit;
			
			string likeUsername = string.IsNullOrEmpty(pageData.Username) ? "%" : "%" + pageData.Username + "%"; 
			string likeCountry = string.IsNullOrEmpty(pageData.Country) ? "%" : "%" + pageData.Country + "%";
			string likeCity = string.IsNullOrEmpty(pageData.City) ? "%" : "%" + pageData.City + "%";

			var query = (from business in businessTable
					 	join user in userTable
						on business.Id equals user.Id
						where 
							DbFunctions.Like(user.Username, likeUsername) &&
							DbFunctions.Like(business.Country, likeCountry) &&
							DbFunctions.Like(business.City, likeCity) &&
							business.Available == true
						select new BusinessDto {
							Id = business.Id,
							Description = business.Description,
							About = business.About,
							Available = business.Available,
							City = business.City,
							Country = business.Country,
							PostalCode = business.PostalCode,
							Email = user.Email,
							Username = user.Username,
							Website = business.Website,
							Image = user.Image,
							Popularity = business.Clients.Count
						});

			if (pageData.FavouriteCount == true)
			{
				query = query.OrderByDescending(bDto => bDto.Popularity).ThenByDescending(bDto => bDto.Username);
			}
			else
			{
				query = query.OrderByDescending(bDto => bDto.Username);
			}
			
			var pageResult = await query.Skip((pageData.PageNumber - 1) * pageItemCount).Take(pageItemCount).ToListAsync();			
			
			return pageResult;
		}
	}
}
