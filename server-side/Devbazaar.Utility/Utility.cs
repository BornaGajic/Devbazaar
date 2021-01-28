using System;
using System.Configuration;

namespace Devbazaar.Utility
{
	public static class Utility
	{
		public enum TypeOfUser : byte
		{
			Client = 1,
			Business = 2
		};

		public static int PageItemLimit = 5;
	}
}
