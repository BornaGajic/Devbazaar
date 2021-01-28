using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.Model.Common;

namespace Devbazaar.Model
{
	public class Category : ICategory
	{
		public Guid Id { get; set; }
		public string Name { get; set; }
	}
}
