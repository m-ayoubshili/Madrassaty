using QuranRecitation.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QuranRecitation.WebApi.Utils
{
    public class EmailBody
    {
        public string GenerateBodyEmailForUser(Member user,string Link)
        {
           
            // Send an email with this link
            var hello = "Bonjour " + user.FirstName + " " + user.LastName + ",<br><br>";
            var welcome = "Bienvenue sur la plateforme School Management ! <br><br>";
            var dontForget = "Votre compte sur la base vient d'être créé. <br>";
            dontForget = "Vous allez bientot recevoir un email de confirmation de l'activation de votre compte";

            dontForget += "Merci.<br><br><br>";
            var confirmation = "Please confirm your account by clicking <a href=\"" + Link + "\">here</a>";
            var signature = "School Management";

            var htmlContent = hello
                + welcome
                + dontForget
                + confirmation
                + signature;
            return htmlContent;
        }
        public string GenerateBodyEmailForAdmin(Guid Id)
        {
            var url = "http://localhost:4200/#/validateregister/" + Id;
            // For more information on how to enable account confirmation and password reset please visit http://go.microsoft.com/fwlink/?LinkID=320771
            var hello = "Bonjour, <br><br>";
            var bodytext = "Une nouvelle demande d'inscrption a été demandée.<br><br>";
            bodytext += "Pour confirmer l'inscription et activer le compte utilisateur, cliquez sur <a href=\"" + url + "\">ce lien</a>, ou recopiez le lien suivant dans la barre de votre navigateur : <br>";
            bodytext += "Merci<br><br><br>";
            var signature = "L'équipe School Management";

            var htmlContent = "<span style='font-family:tahoma,verdana,segoe,sans-serif'; font-size:14px>"
                + hello
                + bodytext
                + signature
                + "</span>";
            return htmlContent;
        }
        public string GenerateBodyEmailForgotPassword(Member user)
        {
            var url = "http://localhost:4200/auth/change-password/"+ user.Id;
            var hello = "Bonjour, <strong>" + user.FirstName + " " + user.LastName + "</strong>.<br><br>";
            var bodytext = "Bienvenue sur la plateforme School management ! <br><br>";
            bodytext += "Une réinitialisation de votre mot de passe vient d'être demandée.<br>";
            bodytext += "Si vous n'êtes pas à l'origine de cette demande, merci de prévenir l'administrateur  par mail.<br>";
            bodytext += "<br>";
            bodytext += "Pour réinitialiser votre mot de passe, cliquez sur <a href=\"" + url + "\">ce lien</a>, ou recopiez le lien suivant dans la barre de votre navigateur : <br>";
            bodytext += "Merci.<br><br><br>";
            var signature = "L'équipe School Management";
            var htmlContent = "<span style='font-family:tahoma,verdana,segoe,sans-serif'; font-size:14px>"
                + hello
                + bodytext
                + signature
                + "</span>";
            return htmlContent;
        }
        public string GenerateBodyEmailChangePassword(Member user)
        {

            var hello = "Bonjour, <strong>" + user.FirstName + " " + user.LastName + "</strong>.<br><br>";
            var bodytext = "Bienvenue sur la plateforme School management ! <br><br>";
            bodytext += "Votre mot de passe vient d'être changé, vous pouvez à nouveaux se connecter à votre espace.<br>";
            bodytext += "Si vous n'êtes pas à l'origine de cette demande, merci de prévenir l'administrateur  par mail.<br>";
            var signature = "L'équipe School Management";
            var htmlContent = "<span style='font-family:tahoma,verdana,segoe,sans-serif'; font-size:14px>"
                + hello
                + bodytext
                + signature
                + "</span>";
            return htmlContent;
        }
        }
}