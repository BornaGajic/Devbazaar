using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using Microsoft.Owin.Security.Jwt;  
using Microsoft.Owin.Security;  
using Microsoft.IdentityModel.Tokens;  
using System.Text;
using System.Configuration;

[assembly: OwinStartup(typeof(Devbazaar.OwinStartup))]

namespace Devbazaar
{
	public class OwinStartup
	{
		public void Configuration (IAppBuilder app)
		{
			app.UseJwtBearerAuthentication(
				new JwtBearerAuthenticationOptions
				{
					AuthenticationMode = AuthenticationMode.Active,
					TokenValidationParameters = new TokenValidationParameters()
					{
						ValidateIssuer = true,
						ValidateAudience = true,
						ValidateIssuerSigningKey = true,
						ValidIssuer = "https://localhost:44356",							
						ValidAudience = "https://localhost:44356",							
						IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(ConfigurationManager.AppSettings["SecretKey"]))
					}
				});
		}
	}
}