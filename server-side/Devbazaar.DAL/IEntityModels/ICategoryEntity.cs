using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.DAL.EntityModels;

namespace Devbazaar.DAL.IEntityModels
{
	public interface ICategoryEntity : IBaseEntity
	{
		string Name { get; set; }

		ICollection<BusinessEntity> Businesses { get; set; }
	}
}
