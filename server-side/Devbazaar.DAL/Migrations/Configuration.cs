namespace Devbazaar.DAL.Migrations
{
    using System;
	using System.Collections.Generic;
	using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
	using Devbazaar.DAL.EntityModels;

	internal sealed class Configuration : DbMigrationsConfiguration<Devbazaar.DAL.Context.DevbazaarDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(Devbazaar.DAL.Context.DevbazaarDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method
            //  to avoid creating duplicate seed data.
            /*
            IList<CategoryEntity> newCategories = new List<CategoryEntity>()
            {
                new CategoryEntity () { Id = Guid.NewGuid(), Name = "Managed IT Service"},
                new CategoryEntity () { Id = Guid.NewGuid(), Name = "On Demand IT"},
                new CategoryEntity () { Id = Guid.NewGuid(), Name = "Network Security"},
                new CategoryEntity () { Id = Guid.NewGuid(), Name = "Database Management"},
                new CategoryEntity () { Id = Guid.NewGuid(), Name = "Cloud Computing"},
                new CategoryEntity () { Id = Guid.NewGuid(), Name = "Data Storage"},
                new CategoryEntity () { Id = Guid.NewGuid(), Name = "Software Support"}
            };

            context.Categories.AddRange(newCategories);
            context.SaveChanges();
            */
        }
    }
}
