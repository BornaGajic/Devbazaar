using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Devbazaar.Repository.Common;
using Devbazaar.Service.Common.IClientServices;
using AutoMapper;
using Devbazaar.DAL.EntityModels;
using System.Data.Entity;
using Devbazaar.Common.DTO.Business;
using Devbazaar.Model.Common;
using Devbazaar.Common.DTO.Client;

using static Devbazaar.Utility.Utility;
using Devbazaar.Common.IDTO.Business;
using Devbazaar.Common.DTO.ClientTask;
using Devbazaar.Common.IDTO.ClientTask;

namespace Devbazaar.Service.ClientServices
{
	public class ClientService : IClientService
	{
		public IUnitOfWork UnitOfWork { get; set; }
		public IMapper Mapper { get; set; }

		public ClientService (IUnitOfWork unitOfWork, IMapper mapper)
		{
			UnitOfWork = unitOfWork;
			Mapper = mapper;
		}

		public async Task<ClientDto> GetClientDataById (Guid clientId)
		{
			var clientEntity = await UnitOfWork.ClientRepository.GetByIdAsync(clientId);

			var userEntity = await (from user in UnitOfWork.UserRepository.Table where clientId == user.Id select user).SingleAsync();

			ClientDto clientDto = new ClientDto {
				Id = userEntity.Id,
				Username = userEntity.Username,
				Email = userEntity.Email,
				Country = clientEntity.Country,
				City = clientEntity.City,
				About = clientEntity.About,
				PostalCode = clientEntity.PostalCode,
				Website = clientEntity.Website
			};

			return clientDto;
		}

		public async Task<List<IBusinessDto>> GetFavouriteBusinesses (Guid clientId)
		{
			var clientEntity = await UnitOfWork.ClientRepository.GetByIdAsync(clientId);
			var businessDtoList = new List<IBusinessDto>();

			foreach (var business in clientEntity.Businesses)
			{
				businessDtoList.Add(new BusinessDto(){
					Id = business.Id,
					Email = business.User.Email,
					Username = business.User.Username,
					Description = business.Description,
					About = business.About,
					Available = business.Available,
					City = business.City,
					Country = business.Country,
					PostalCode = business.PostalCode,
					Website = business.Website,
					Popularity = business.Clients.Count,
					Image = business.User.Image,
					Categories = Mapper.Map<List<ICategory>>(business.Categories)
				});

				if (business.Clients.Contains(clientEntity))
				{
					businessDtoList.Last().IsFavourited = true;
				}
			}


			return businessDtoList;
		}

		public async Task RemoveFromFavourites (Guid clientId, Guid businessId)
		{
			var clientEntity = await UnitOfWork.ClientRepository.GetByIdAsync(clientId);

			var business = clientEntity.Businesses.First(b => b.Id == businessId);
			clientEntity.Businesses.Remove(business);

			await UnitOfWork.UpdateAsync(clientEntity);
			await UnitOfWork.CommitAsync<ClientEntity>();
		}

		public async Task<List<ClientTaskDto>> GetTasks (Guid clientId)
		{
			var clientEntity = await UnitOfWork.ClientRepository.GetByIdAsync(clientId);
			
			var clientTasks = Mapper.Map<List<ClientTaskDto>>(clientEntity.Tasks);

			foreach (var task in clientTasks)
			{
				var userEntity = await (from user in UnitOfWork.UserRepository.Table where task.ClientId == user.Id select user).SingleAsync();

				task.Username = userEntity.Username;
				task.Email = userEntity.Email;
				task.Image = userEntity.Image;
			}

			return clientTasks;
		}

		public async Task UpdateAsync (Dictionary<string, object> updateClient, Guid clientId)
		{
			var clientEntity = await (from c in UnitOfWork.ClientRepository.TableAsNoTracking where c.Id == clientId select c).SingleAsync();

			UpdateEntityFromDict(clientEntity, updateClient);
			
			try
			{
				await UnitOfWork.UpdateAsync<ClientEntity>(clientEntity);
				await UnitOfWork.CommitAsync<ClientEntity>();
			}
			catch (Exception e)
			{
				throw e;
			}
		}

		public async Task<IBusinessDto> AddToFavourites (Guid clientId, Guid businessId)
		{
			var businessEntity = await (from business in UnitOfWork.BusinessRepository.Table where business.Id == businessId select business).SingleAsync();
			var clientEntity = await (from client in UnitOfWork.ClientRepository.Table where client.Id == clientId select client).SingleAsync();

			clientEntity.Businesses.Add(businessEntity);

			IBusinessDto businessDto = new BusinessDto () { 
				Id = businessEntity.Id,
				Username = businessEntity.User.Username,
				Email = businessEntity.User.Email,
				Description = businessEntity.Description,
				About = businessEntity.About,
				Available = businessEntity.Available,
				City = businessEntity.City,
				Country = businessEntity.Country,
				PostalCode = businessEntity.PostalCode,
				Website = businessEntity.Website,
				Popularity = businessEntity.Clients.Count,
				Image = businessEntity.User.Image,
				Categories = Mapper.Map<List<ICategory>>(businessEntity.Categories)
			};

			try
			{
				await UnitOfWork.UpdateAsync(clientEntity);
				await UnitOfWork.CommitAsync<ClientEntity>();

				return businessDto;
			}
			catch (Exception e)
			{
				throw e;
			}
		}
	}
}
