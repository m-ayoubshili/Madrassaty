using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net.Configuration;
using System.Threading.Tasks;
using System.Web;

namespace QuranRecitation.WebApi.Utils
{
    public class Mail
    {
        private const string apiKey = "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";

        public static async Task SendSingleEmail(string subject, string to, string htmlContent)
        {
            var client = new SendGridClient(apiKey);
            SmtpSection section = (SmtpSection)ConfigurationManager.GetSection("system.net/mailSettings/smtp");
            var from = new EmailAddress(section.Network.UserName, "L'équipe School Management");
            var msg = MailHelper.CreateSingleEmail(from, new EmailAddress(to), subject, string.Empty, htmlContent);
            var response = await client.SendEmailAsync(msg);
        }

        public static async Task SendSingleEmailToMultipleRecipients(string subject, List<string> tos, string htmlContent)
        {
            var client = new SendGridClient(apiKey);
            SmtpSection section = (SmtpSection)ConfigurationManager.GetSection("system.net/mailSettings/smtp");
            var from = new EmailAddress(section.Network.UserName, "L'équipe School Management");
            var tosList = new List<EmailAddress>();
            tos.Distinct().ToList().ForEach(email => tosList.Add(new EmailAddress(email)));

            var msg = MailHelper.CreateSingleEmailToMultipleRecipients(from, tosList, subject, string.Empty, htmlContent);
            //var bytes = File.ReadAllBytes("/testemail.txt");
            //var file = Convert.ToBase64String(bytes);
            //msg.AddAttachment("file.txt", file);
            var response = await client.SendEmailAsync(msg);
        }


        public static async Task SendEmailwithPJ(string subject, List<string> tos, string htmlContent, byte[] b, int id)
        {
            var client = new SendGridClient(apiKey);
            SmtpSection section = (SmtpSection)ConfigurationManager.GetSection("system.net/mailSettings/smtp");
            var from = new EmailAddress(section.Network.UserName, "L'équipe School Management");
            var tosList = new List<EmailAddress>();
            tos.Distinct().ToList().ForEach(email => tosList.Add(new EmailAddress(email)));

            var msg = MailHelper.CreateSingleEmailToMultipleRecipients(from, tosList, subject, string.Empty, htmlContent);
            //var bytes = File.ReadAllBytes("/testemail/testemail.txt");
            var file = Convert.ToBase64String(b);
            msg.AddAttachment("filename " + "n°" + id + ".pdf", file);

            var response = await client.SendEmailAsync(msg);
        }

    }
}