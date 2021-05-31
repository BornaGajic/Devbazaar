using System.Reflection;
using System.Web.Http;
using AutoMapper;
using Autofac;
using Autofac.Integration.WebApi;
using Devbazaar.DAL.Context;
using Devbazaar.Repository;
using Devbazaar.Service;
using Devbazaar.AutoMapperProfiles;

namespace Devbazaar
{
	public class WebApiApplication : System.Web.HttpApplication
	{
		protected void Application_Start ()
		{
			GlobalConfiguration.Configure(WebApiConfig.Register);

			var builder = new ContainerBuilder();
			var config = GlobalConfiguration.Configuration;

			builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

			builder.RegisterType<DevbazaarDbContext>().AsSelf().InstancePerRequest();

			builder.RegisterModule(new RepositoryDIModule());
			builder.RegisterModule(new ServiceDIModule());

			builder.Register(context => new MapperConfiguration(cfg => {
				cfg.AddProfile<BusinessProfile>();
				cfg.AddProfile<UserProfile>();
				cfg.AddProfile<CategoryProfile>();
				cfg.AddProfile<ClientTaskProfile>();
			})).AsSelf().SingleInstance();

			builder.Register(c =>
			{
				//This resolves a new context that can be used later.
				var context = c.Resolve<IComponentContext>();
				var mapperConfig = context.Resolve<MapperConfiguration>();
				return mapperConfig.CreateMapper(context.Resolve);
			})
			.As<IMapper>()
			.InstancePerRequest();

			var container = builder.Build();
			config.DependencyResolver = new AutofacWebApiDependencyResolver(container);
		}
	}
}
