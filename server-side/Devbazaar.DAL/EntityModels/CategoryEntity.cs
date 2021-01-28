using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.DAL.IEntityModels;

namespace Devbazaar.DAL.EntityModels
{
	public class CategoryEntity : BaseEntity, ICategoryEntity
	{
		public CategoryEntity ()
		{
			this.Businesses = new HashSet<BusinessEntity>();
		}

		public string Name { get; set; }
		public virtual ICollection<BusinessEntity> Businesses { get; set; }
	}
}
