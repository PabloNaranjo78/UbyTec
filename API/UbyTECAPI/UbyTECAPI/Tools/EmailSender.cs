using System;
using System.Net;
using System.Net.Mail;
using UbyTECAPI.Connection;
namespace UbyTECAPI.Tools
{
    public class EmailSender
    {
        public static bool sendEmail(string email, string usuario, string pass, string tipo)
        {
            try
            {
                MailMessage mmsg = new MailMessage();
                mmsg.To.Add(email);
                mmsg.Subject = $"Contrasela UbyTEC para {tipo}";
                mmsg.SubjectEncoding = System.Text.Encoding.UTF8;

                mmsg.Body = $"<h1>Hola, {usuario} </h1>" +
                    $"<h2>Su contaseña para {tipo} es {pass}</h2>";
                mmsg.BodyEncoding = System.Text.Encoding.UTF8;
                mmsg.IsBodyHtml = true;
                mmsg.From = new MailAddress(Connection.Connection.email);

                SmtpClient client = new SmtpClient();

                client.Credentials = new NetworkCredential(Connection.Connection.email, Connection.Connection.emailPass);

                client.Port = 587;
                client.EnableSsl = true;

                client.Host = "smtp.gmail.com";
                client.Send(mmsg);
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
