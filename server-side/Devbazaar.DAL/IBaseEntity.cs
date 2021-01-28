using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Devbazaar.DAL
{
	public interface IBaseEntity
	{
		Guid Id { get; set; }
	}
}
