using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Devbazaar.Common.DTO.Business;
using Devbazaar.Common.IPageData.Business;
using Devbazaar.Model.Common;

namespace Devbazaar.Common.PageData.Business
{
	public class BusinessReturnType : BusinessReturnTypeDTO, IBusinessReturnType
	{
		public List<ICategory> Categories { get; set; }
	}
}
