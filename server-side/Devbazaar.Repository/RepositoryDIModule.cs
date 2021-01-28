using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Autofac;
using Devbazaar.Repository.Common;
using Devbazaar.Repository.Common.Repositories;
using Devbazaar.Repository.Repositories;

namespace Devbazaar.Repository
{
	public class RepositoryDIModule : Module
	{
		protected override void Load (ContainerBuilder builder)
		{
			builder.RegisterType<BusinessRepository>().As<IBusinessRepository>();
			builder.RegisterType<UserRepository>().As<IUserRepository>();
			builder.RegisterType<CategoryRepository>().As<ICategoryRepository>();
			builder.RegisterType<ClientTaskRepository>().As<IClientTaskRepository>();
			builder.RegisterType<ClientRepository>().As<IClientRepository>();

			builder.RegisterType<UnitOfWork>().As<IUnitOfWork>();
		}
	}
}
