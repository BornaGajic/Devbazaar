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

		public static int PageItemLimit = 6;
		public static int TotalBusinessCount = 0;
		public static int TotalClientTaskCount = 0;
	}
}
