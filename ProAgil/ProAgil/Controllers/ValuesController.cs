using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProAgil.Model;

namespace ProAgil.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<Evento>> Get()
        {
            return new Evento[] {

                new Evento()
                {
                    EventoId = 1,
                    Local = "Brasilândia",
                    DataEvento = DateTime.Now.AddDays(1).ToString("dd/MM/yyyy"),
                    Lote = "1º Lote",
                    QtdPessoas = 10,
                    Tema = "Angular e .net Core."
                },

                new Evento()
                {
                    EventoId = 2,
                    Local = "Av. Paulista",
                    DataEvento = DateTime.Now.AddDays(5).ToString("dd/MM/yyyy"),
                    Lote = "2º Lote",
                    QtdPessoas = 30,
                    Tema = "Angular e .net Core - Volume 2."
                }
            };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<Evento> Get(int id)
        {
            return new Evento[] {

                new Evento()
                {
                    EventoId = 1,
                    Local = "Brasilândia",
                    DataEvento = DateTime.Now.AddDays(1).ToString("dd/MM/yyyy"),
                    Lote = "1º Lote",
                    QtdPessoas = 10,
                    Tema = "Angular e .net Core."
                },

                new Evento()
                {
                    EventoId = 2,
                    Local = "Av. Paulista",
                    DataEvento = DateTime.Now.AddDays(5).ToString("dd/MM/yyyy"),
                    Lote = "2º Lote",
                    QtdPessoas = 30,
                    Tema = "Angular e .net Core - Volume 2."
                }
            }.ToList().FirstOrDefault(x => x.EventoId == id); 
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
