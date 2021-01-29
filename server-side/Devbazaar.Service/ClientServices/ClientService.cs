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

		public async Task<bool> AddToFavourites (Guid clientId, Guid businessId)
		{
			var businessEntity = await (from business in UnitOfWork.BusinessRepository.Table where business.Id == businessId select business).SingleAsync();
			var clientEntity = await (from client in UnitOfWork.ClientRepository.Table where client.Id == clientId select client).SingleAsync();

			clientEntity.Businesses.Add(businessEntity);

			try
			{
				await UnitOfWork.CommitAsync<ClientEntity>();
			}
			catch (Exception e)
			{
				Console.WriteLine(e.Message);
				return false;
			}
			
			return true;
		}
	}
}
