using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.DAL.IEntityModels;

namespace Devbazaar.DAL.EntityModels
{
	public class ClientEntity : BaseEntity, IClientEntity
	{
		public ClientEntity ()
		{
			this.Businesses = new HashSet<BusinessEntity>();
		}

		public string About { get; set; }
		public string Website { get; set; }
		public string Country { get; set; }
		public string City { get; set; }
		public int PostalCode { get; set; }

		public virtual UserEntity User { get; set; }
		public ICollection<TaskEntity> Tasks { get; set; }
		public virtual ICollection<BusinessEntity> Businesses { get; set; }
	}
}
