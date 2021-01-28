using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.DAL.EntityModels;

namespace Devbazaar.DAL.IEntityModels
{
	public interface IClientEntity : IBaseEntity
	{
		UserEntity User { get; set; }
		string FirstName { get; set; }
		string LastName { get; set; }
		ICollection<TaskEntity> Tasks { get; set; }
		ICollection<BusinessEntity> Businesses { get; set; }
	}
}