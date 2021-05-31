using System;
using System.Collections.Generic;
using System.Configuration;
using Devbazaar.DAL;

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

		public static Dictionary<string, object> GenerateUpdateDict<T> (T updateRest)
		{
			var updatedBusiness = new Dictionary<string, object>();

            foreach (var property in typeof(T).GetProperties())
            {
                var value = property.GetValue(updateRest);
                if (value != null)
                {
                    updatedBusiness[property.Name] = property.GetValue(updateRest);
                }
            }

			return updatedBusiness;
		}

		public static void UpdateEntityFromDict<T> (T entity, Dictionary<string, object> updateDict) where T : IBaseEntity
		{
			foreach (var prop in typeof(T).GetProperties())
			{
				if (updateDict.ContainsKey(prop.Name))
				{
					prop.SetValue(entity, updateDict[prop.Name]);
				}
			}
		}
	}
}
