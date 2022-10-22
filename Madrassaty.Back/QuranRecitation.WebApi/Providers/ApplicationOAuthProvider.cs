using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using QuranRecitation.Data.Model;
using Newtonsoft.Json;

namespace QuranRecitation.WebApi.Providers
{
    public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider
    {
        private readonly string _publicClientId;

        public ApplicationOAuthProvider(string publicClientId)
        {
            if (publicClientId == null)
            {
                throw new ArgumentNullException("publicClientId");
            }
            _publicClientId = publicClientId;
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {

            var userManager = context.OwinContext.GetUserManager<ApplicationUserManager>();

            var UserName = context.UserName;
            if (UserName.IndexOf("@") != -1)
            {
                Member userByEmail = await userManager.FindByEmailAsync(UserName);
                if (userByEmail != null)
                    UserName = userByEmail.UserName;
            }

            Member user = await userManager.FindAsync(UserName, context.Password);

            if (user == null)
            {
                context.SetError("invalid_grant", "The user name or password is incorrect.");
                return;
            }
            if (user.EmailConfirmed == false && user.MemberStateId==1)
            {
                context.SetError("error", "please confirm your email and wait the admin to aprouve your account  ");
                return;
            }
            if (user.EmailConfirmed == true && user.MemberStateId == 1)
            {
                context.SetError("error", "please wait the admin to aprouve your account ");
                return;
            }
            if (user.EmailConfirmed == true && user.MemberStateId == 3)
            {
                context.SetError("error", "your account was rejected by the admin");
                return;
            }

            ClaimsIdentity oAuthIdentity = await user.GenerateUserIdentityAsync(userManager,
               OAuthDefaults.AuthenticationType);
            ClaimsIdentity cookiesIdentity = await user.GenerateUserIdentityAsync(userManager,
                CookieAuthenticationDefaults.AuthenticationType);

            AuthenticationProperties properties = CreateProperties("userName", user.UserName);
            AuthenticationProperties idProperties = CreateProperties("userId", user.Id.ToString());
            //AuthenticationProperties userProperties = CreateProperties("user", JsonConvert.SerializeObject(user));
            AuthenticationProperties userProperties = CreateProperties("user", JsonConvert.SerializeObject(new { Id = user.Id,schoolId=user.SchoolId , UserName = user.UserName, MemberStatusId = user.MemberStatusId }));

            AuthenticationTicket ticket = new AuthenticationTicket(oAuthIdentity, properties);
            context.Validated(ticket);

            AuthenticationTicket idTicket = new AuthenticationTicket(oAuthIdentity, idProperties);
            context.Validated(idTicket);

            AuthenticationTicket userTicket = new AuthenticationTicket(oAuthIdentity, userProperties);
            context.Validated(userTicket);
            context.Request.Context.Authentication.SignIn(cookiesIdentity);
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            // Resource owner password credentials does not provide a client ID.
            if (context.ClientId == null)
            {
                context.Validated();
            }

            return Task.FromResult<object>(null);
        }

        public override Task ValidateClientRedirectUri(OAuthValidateClientRedirectUriContext context)
        {
            if (context.ClientId == _publicClientId)
            {
                Uri expectedRootUri = new Uri(context.Request.Uri, "/");

                if (expectedRootUri.AbsoluteUri == context.RedirectUri)
                {
                    context.Validated();
                }
            }

            return Task.FromResult<object>(null);
        }

        public static AuthenticationProperties CreateProperties(string name, string value)
        {
            IDictionary<string, string> data = new Dictionary<string, string>
            {
                { name, value }
            };
            return new AuthenticationProperties(data);
        }
    }
}