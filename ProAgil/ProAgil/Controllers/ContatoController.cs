using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProAgil.Dominio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace ProAgil.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContatoController : ControllerBase
    {

        [HttpPost]
        public async Task<IActionResult> Post(Contato model)
        {
            try
            {
                //Console.WriteLine("Log Post");
                //Console.WriteLine(model.email);
                //Console.WriteLine(model.assunto);

                var remetente = "thyagopavan@hotmail.com";
                var destinatario = "thyagopavan@yahoo.com.br";
                var assunto = "Teste - Contato enviado via app Angular + .Net";
                var corpo = string.Format("Isto é uma mensagem enviada via app Angular + .Net\n {0} - {1}", model.email, model.assunto);
                var senha = "minha senha aqui";


                MailMessage mailMessage = new MailMessage(remetente, destinatario, assunto, corpo);
                SmtpClient smtpClient = new SmtpClient("smtp.live.com", 587);
                smtpClient.EnableSsl = true;
                NetworkCredential networkCredential = new NetworkCredential(remetente, senha);

                smtpClient.Credentials = networkCredential;

                smtpClient.Send(mailMessage);

                return this.StatusCode(StatusCodes.Status200OK);
            }
            catch (Exception ex)
            {
                string erro = ex.InnerException.ToString();
                var msgErro = ex.Message.ToString() + erro;
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro ao enviar email: {msgErro}");
            }
           
            return this.StatusCode(StatusCodes.Status200OK);
        }
    }
}
