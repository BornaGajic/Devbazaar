using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.DAL.EntityModels;

namespace Devbazaar.DAL.IEntityModels
{
	public interface IBusinessEntity : IBaseEntity
	{
		string Description { get; set; }
		string About { get; set; }
		string Website { get; set; }
		bool Available { get; set; }
		string Country { get; set; }
		string City { get; set; }
		int PostalCode { get; set; } // base64 string

		UserEntity User { get; set; }
		ICollection<TaskEntity> Tasks { get; set; }
		ICollection<CategoryEntity> Categories { get; set; }
		ICollection<ClientEntity> Clients { get; set; }
	}
}
