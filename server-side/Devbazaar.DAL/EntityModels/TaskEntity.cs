using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.DAL.IEntityModels;

namespace Devbazaar.DAL.EntityModels
{
	public class TaskEntity : BaseEntity, ITaskEntity
	{
		public string Description { get; set; }
		public string Title { get; set; }
		public int LowPrice { get; set; }
		public int HighPrice { get; set; }
		public DateTime DateAdded { get; set; }

		public Guid ClientId { get; set; }
		public ClientEntity Client { get; set; }

		public Guid? BusinessId { get; set; }
		public BusinessEntity Business { get; set; }
	}
}
