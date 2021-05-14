using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.Repository.Common;
using Devbazaar.Service.Common.IClientServices;
using AutoMapper;
using Devbazaar.DAL.EntityModels;
using System.Data.Entity;
using Devbazaar.Common.DTO.Business;
using Devbazaar.Model.Common;
using Devbazaar.Common.IPageData.Business;
using Devbazaar.Common.DTO.Client;

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

		public async Task<List<IBusiness>> GetFavouriteBusinesses (Guid clientId)
		{
			var clientEntity = await UnitOfWork.ClientRepository.GetByIdAsync(clientId);

			return Mapper.Map<List<IBusiness>>(clientEntity.Businesses);
		}

		public async Task RemoveFromFavourites (Guid clientId, Guid businessId)
		{
			var clientEntity = await UnitOfWork.ClientRepository.GetByIdAsync(clientId);

			var business = clientEntity.Businesses.First(b => b.Id == businessId);
			clientEntity.Businesses.Remove(business);

			await UnitOfWork.UpdateAsync(clientEntity);
			await UnitOfWork.CommitAsync<ClientEntity>();
		}

		public async Task<List<IClientTask>> GetTasks (Guid clientId)
		{
			var clientEntity = await UnitOfWork.ClientRepository.GetByIdAsync(clientId);

			return Mapper.Map<List<IClientTask>>(clientEntity.Tasks);
		}

		public async Task<bool> UpdateAsync (Dictionary<string, object> updateClient, Guid clientId)
		{
			var clientEntity = await (from c in UnitOfWork.ClientRepository.TableAsNoTracking where c.Id == clientId select c).SingleAsync();

			foreach (var prop in typeof(ClientEntity).GetProperties())
			{
				if (updateClient.ContainsKey(prop.Name))
				{
					prop.SetValue(clientEntity, updateClient[prop.Name]);
				}
			}
			
			try
			{
				await UnitOfWork.UpdateAsync<ClientEntity>(clientEntity);
				await UnitOfWork.CommitAsync<ClientEntity>();
			}
			catch (Exception e)
			{
				Console.WriteLine(e.Message);
				return false;
			}
			
			return true;
		}

		public async Task<IBusinessDto> AddToFavourites (Guid clientId, Guid businessId)
		{
			var businessEntity = await (from business in UnitOfWork.BusinessRepository.Table where business.Id == businessId select business).SingleAsync();
			var clientEntity = await (from client in UnitOfWork.ClientRepository.Table where client.Id == clientId select client).SingleAsync();

			clientEntity.Businesses.Add(businessEntity);

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

			try
			{
				await UnitOfWork.UpdateAsync(clientEntity);
				await UnitOfWork.CommitAsync<ClientEntity>();
			}
			catch (Exception e)
			{
				Console.WriteLine(e.Message);
				return null;
			}
			
			return businessDto;
		}
	}
}
