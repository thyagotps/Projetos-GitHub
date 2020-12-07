using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProAgil.Dominio;
using ProAgil.Repositorio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProAgil.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventoController : ControllerBase
    {
        private readonly IProAgilRepositorio repo;

        public EventoController(IProAgilRepositorio repo)
        {
            this.repo = repo;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var results = await repo.GetAllEventosAsync(true);

                return Ok(results);
            }
            catch (Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou!");
            }
        }


        [HttpGet("{eventoId}")]
        public async Task<IActionResult> Get(int eventoId)
        {
            try
            {
                var results = await repo.GetEventoAsyncById(eventoId, true);

                return Ok(results);
            }
            catch (Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou!");
            }
        }


        [HttpGet("getByTema/{tema}")]
        public async Task<IActionResult> Get(string tema)
        {
            try
            {
                var results = await repo.GetAllEventosAsyncByTema(tema, true);

                return Ok(results);
            }
            catch (Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou!");
            }
        }


        [HttpPost] 
        public async Task<IActionResult> Post(Evento model)
        {
            try
            {
                repo.Add(model);

                if (await repo.SaveChangesAsync())
                {
                    return Created($"api/evento/{model.Id}", model);
                }

            }
            catch (Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou!"); ;
            }

            return BadRequest();
        }


        [HttpPut("{eventoId}")]
        public async Task<IActionResult> Put(int eventoId, Evento model)
        {
            try
            {
                var evento = await repo.GetEventoAsyncById(eventoId, false);
                if (evento == null) return NotFound();

                repo.Update(model);

                if (await repo.SaveChangesAsync())
                {
                    return Created($"api/evento/{model.Id}", model);
                }

            }
            catch (Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou!"); ;
            }

            return BadRequest();
        }


        [HttpDelete("{eventoId}")]
        public async Task<IActionResult> Delete(int eventoId)
        {
            try
            {
                var evento = await repo.GetEventoAsyncById(eventoId, false);
                if (evento == null) return NotFound();

                repo.Delete(evento);

                if (await repo.SaveChangesAsync())
                {
                    return Ok();
                }

            }
            catch (Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou!"); ;
            }

            return BadRequest();
        }






    }
}
