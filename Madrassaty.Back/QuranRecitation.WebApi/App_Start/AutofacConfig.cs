using System.Reflection;
using System.Web.Http;
using Autofac;
using Autofac.Integration.WebApi;
using QuranRecitation.Data;
using QuranRecitation.Data.Repositories;
using QuranRecitation.Data.Services;

namespace QuranRecitation.WebApi.App_Start
{
    public class AutofacConfig
    {
        public static void Run()
        {
            var builder = new ContainerBuilder();
            RegisterDependencies(builder);
        }

        public static void RegisterDependencies(ContainerBuilder builder)
        {
            builder.RegisterType(typeof(QuranRecitationDbContext)).InstancePerLifetimeScope();

            // Register WebApi controllers
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            // Register repositories
            builder.RegisterAssemblyTypes(typeof(MemberRepository).Assembly)
                   .Where(t => t.Name.EndsWith("Repository"))
                   .AsImplementedInterfaces()
                   .InstancePerRequest();

            // Register services
            builder.RegisterAssemblyTypes(typeof(MemberService).Assembly)
                   .Where(t => t.Name.EndsWith("Service"))
                   .AsImplementedInterfaces()
                   .InstancePerRequest();


            IContainer container = builder.Build();

            // Set the MVC dependency resolver
            System.Web.Mvc.DependencyResolver.SetResolver(new Autofac.Integration.Mvc.AutofacDependencyResolver(container));

            // Set the WebApi dependency resolver
            GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }
    }
}