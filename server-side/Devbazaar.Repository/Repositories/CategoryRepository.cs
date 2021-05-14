using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.DAL.Context;
using Devbazaar.DAL.EntityModels;
using Devbazaar.DAL.IEntityModels;
using Devbazaar.Repository.Common;
using Devbazaar.Repository.Common.Repositories;

namespace Devbazaar.Repository.Repositories
{
	public class CategoryRepository : BaseRepository<CategoryEntity>, ICategoryRepository
	{
		public CategoryRepository (DevbazaarDbContext context) : base(context)
		{
		}

		public async Task<CategoryEntity> GetByIdAsync (Guid categoryId)
		{
			return await (from category in TableAsNoTracking where category.Id == categoryId select category).SingleAsync();
		}

		public async Task<Guid> GetIdByName (string name)
		{
			var Id = await (from category in TableAsNoTracking
					  	    where category.Name == name select category.Id).ToListAsync();

			
			return Id.Count == 1 ? Id.First() : Guid.Empty;					
		}

		public async Task AttachAsync (CategoryEntity categoryEntity)
		{
			await Task.Run(() => { Entities.Attach(categoryEntity); } );

			return;
		}

		public async Task<List<CategoryEntity>> GetCategories ()
		{
			return await (from c in TableAsNoTracking select c).ToListAsync();
		}
	}
}
