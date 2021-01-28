using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Autofac;
using Devbazaar.Service.BusinessServices;
using Devbazaar.Service.Common.IBusinessServices;
using Devbazaar.Service.UserServices;
using Devbazaar.Service.Common.IUserServices;
using AutoMapper;
using Devbazaar.Service.Common.IClientTaskServices;
using Devbazaar.Service.ClientTaskServices;
using Devbazaar.Common.PageData.ClientTask;
using Devbazaar.Common.IPageData.ClientTask;
using Devbazaar.Service.ClientServices;
using Devbazaar.Service.Common.IClientServices;

namespace Devbazaar.Service
{
	public class ServiceDIModule : Module
	{
		protected override void Load (ContainerBuilder builder)
		{
			builder.RegisterType<BusinessService>().As<IBusinessService>();
			builder.RegisterType<UserService>().As<IUserService>();
			builder.RegisterType<ClientTaskService>().As<IClientTaskService>();
			builder.RegisterType<ClientService>().As<IClientService>();
		}
	}
}
