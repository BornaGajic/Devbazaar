using System;
using System.Collections.Generic;
using System.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Devbazaar.DAL.EntityModels;
using Devbazaar.Model.Common.IUser;
using Devbazaar.Repository.Common;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using static Devbazaar.Utility.Utility;
using System.Security.Cryptography;
using Devbazaar.Service.Common.IUserServices;
using System.Data.Entity;
using Devbazaar.Model;
using Devbazaar.Model.Common;
using Devbazaar.Common.DTO.Client;
using Devbazaar.Common.DTO.User;
using Devbazaar.Common.DTO.Business;

namespace Devbazaar.Service.UserServices
{
	public class UserService : IUserService
	{
		protected IUnitOfWork UnitOfWork { get; set; }
		protected IMapper Mapper { get; set; }

		public UserService (IUnitOfWork unitOfWork, IMapper mapper)
		{
			UnitOfWork = unitOfWork;
			Mapper = mapper;
		}

		// creates new user, by default it creates new Business, else it creates Client
		public async Task<string> CreateAsync (IUser user, TypeOfUser typeOfUser)
		{
			if (await UnitOfWork.UserRepository.CheckExistence(user.Email, user.Username) == null)
			{
				user.Id = Guid.NewGuid();
				user.Password = EncodePassword(user.Password);

				var userEntity = Mapper.Map<UserEntity>(user);

				await UnitOfWork.AddAsync(userEntity);

				if (typeOfUser == TypeOfUser.Client)
				{
					await UnitOfWork.AddAsync<ClientEntity>(new ClientEntity(){ Id = userEntity.Id });
					await UnitOfWork.CommitAsync<ClientEntity>();
				}

				await UnitOfWork.CommitAsync<UserEntity>();

				return GenerateToken(user, typeOfUser);
			}
			else
			{
				throw new Exception("User already exists");
			}
		}

		// returns token if User exists, else returns empty string
		public async Task<string> LoginAsync (IUser user)
		{
			UserEntity thisUser = await UnitOfWork.UserRepository.CheckExistence(user.Email, EncodePassword(user.Password));
			TypeOfUser role = TypeOfUser.Business;

			if (thisUser == null)
			{
				throw new Exception("Invalid credentials");
			}
			else if (await UnitOfWork.BusinessRepository.GetByIdAsync(thisUser.Id) == null)
			{
				role = TypeOfUser.Client;
			}

			user.Id = thisUser.Id;
			user.Username = thisUser.Username;

			return GenerateToken(user, role);
		}

		public async Task AddImageAsync (byte[] image, Guid userId)
		{
			var userEntity = await (from u in UnitOfWork.UserRepository.Table where u.Id == userId select u).SingleAsync();

			userEntity.Image = image;
			
			try
			{
				await UnitOfWork.UpdateAsync(userEntity);
				await UnitOfWork.CommitAsync<UserEntity>();
			}
			catch (Exception e)
			{
				throw e;
			}
		}

		public async Task<byte[]> GetImageAsync (Guid userId)
		{
			var userEntity = await (from u in UnitOfWork.UserRepository.Table where u.Id == userId select u).SingleAsync();

			return userEntity.Image;
		}

		public async Task<User> UpdateAsync (Dictionary<string, object> changedValues, Guid userId)
		{
			var userEntity = await (from u in UnitOfWork.UserRepository.Table where u.Id == userId select u).SingleAsync();	

			UpdateEntityFromDict(userEntity, changedValues);
			
			try
			{
				await UnitOfWork.UpdateAsync<UserEntity>(userEntity);
				await UnitOfWork.CommitAsync<UserEntity>();
			}
			catch (Exception e)
			{
				throw e;
			}

			return Mapper.Map<User>(userEntity);
		}

		public async Task DeleteAsync (IUser user)
		{
			var userEntity = Mapper.Map<UserEntity>(user);

			try
			{
				await UnitOfWork.DeleteAsync(userEntity);

				await UnitOfWork.CommitAsync<UserEntity>();
			}
			catch (Exception e)
			{
				throw e;
			}
		}

		public string GenerateToken (IUser user, TypeOfUser role, int expireMinutes = 30)
		{
			var SecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(ConfigurationManager.AppSettings["SecretKey"]));
			var credentials = new SigningCredentials(SecurityKey, SecurityAlgorithms.HmacSha256);

			List<Claim> claims = new List<Claim>()
			{
				new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
				new Claim("Id", user.Id.ToString()),
				new Claim("Username", user.Username),
				new Claim("Email", user.Email),
				new Claim("Role", role.ToString()),
				new Claim(ClaimTypes.Role, role.ToString())
			};

			string issuer = ConfigurationManager.AppSettings["issuer"];

			var token = new JwtSecurityToken(issuer, issuer, claims, expires: DateTime.Now.AddDays(1), signingCredentials: credentials);

			return new JwtSecurityTokenHandler().WriteToken(token);
		}

		private static string EncodePassword (string password)
		{
			string encodedPassword = Encoding.UTF8.GetString(new SHA256Managed().ComputeHash(Encoding.UTF8.GetBytes(password)));
			string encoded = string.Empty;

			foreach (byte b in encodedPassword)
            {
                encoded += String.Format("{0:x2}", b);
            }

			return encoded;
		}
	}
}
