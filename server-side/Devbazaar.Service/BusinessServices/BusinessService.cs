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
using Devbazaar.Common.IPageData.Business;
using Devbazaar.Common.IPageData.ClientTask;
using Devbazaar.Common.PageData;
using Devbazaar.Common.PageData.ClientTask;
using Devbazaar.Common.DTO.Business;
using static Devbazaar.Utility.Utility;

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

			BusinessDto businessDto = new BusinessDto () { 
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

		public async Task<int> CreateAsync (IBusiness newBusiness, List<ICategory> categories, Guid userId)
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

				return await Task.FromResult(1); 
			}
			catch (Exception e)
			{
				Console.WriteLine(e.Message);

				return await Task.FromResult(0);
			}
		}

		public async Task<int> UpdateAsync (Dictionary<string, object> updatedBusiness, Guid businessId)
		{
			var entity = await (from business in UnitOfWork.BusinessRepository.TableAsNoTracking where business.Id == businessId select business).SingleAsync();

			foreach (var prop in typeof(BusinessEntity).GetProperties())
			{
				if (updatedBusiness.ContainsKey(prop.Name))
				{
					prop.SetValue(entity, updatedBusiness[prop.Name]);
				}
			}
			
			await UnitOfWork.UpdateAsync<BusinessEntity>(entity);
			await UnitOfWork.CommitAsync<BusinessEntity>();

			return await Task.FromResult(1);
		}

		public async Task<bool> AcquireClientTaskAsync (Guid businessId, Guid clientTaskId)
		{
			try
			{
				var entity = await UnitOfWork.ClientTaskRepository.UpdateAsync(new Dictionary<string, object>(){ {"BusinessId", businessId} }, clientTaskId);

				await UnitOfWork.UpdateAsync<TaskEntity>(entity);
				await UnitOfWork.CommitAsync<TaskEntity>();
			}
			catch (Exception e)
			{
				Console.WriteLine(e.Message);

				return false;
			}

			return true;
		}

		public async Task<List<IClientTaskReturnType>> AcquiredClientTasksAsync (ClientTaskPage pageData, Guid businessId)
		{
			var clientTaskReturnTypes = await UnitOfWork.ClientTaskRepository.PaginatedGetAsync(pageData, null, businessId);

			var userTable = UnitOfWork.UserRepository.Table;

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
			var businessTable = UnitOfWork.BusinessRepository.Table;

			var businessList = await ApplyPageSeasoningAsync(pageData);

			List<BusinessEntity> clientFavourites = null;

			// users favourite businesses
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

		private async Task<List<BusinessDto>> ApplyPageSeasoningAsync (BusinessPage pageData)
		{
			var userTable = UnitOfWork.UserRepository.Table;
			var businessTable = UnitOfWork.BusinessRepository.Table;

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
							DbFunctions.Like(business.City, likeCity)
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
							Popularity = business.Clients.Count
						});

			Utility.Utility.TotalBusinessCount = await query.CountAsync();

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
