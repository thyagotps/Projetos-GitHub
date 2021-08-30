using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProAgil.Dominio;
using ProAgil.Repositorio;
using ProAgil.WebAPI.Dtos;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Net.Mime;
using System.Threading.Tasks;

namespace ProAgil.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventoController : ControllerBase
    {
        private readonly IProAgilRepositorio repo;
        private readonly IMapper mapper;

        public EventoController(IProAgilRepositorio repo, 
                                IMapper mapper)
        {
            this.repo = repo;
            this.mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var eventos = await repo.GetAllEventosAsync(true);

                var results = mapper.Map<IEnumerable<EventoDto>>(eventos);

                return Ok(results);
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de dados falhou: {ex.Message}");
            }
        }


        
        [HttpGet("{eventoId}")]
        public async Task<IActionResult> Get(int eventoId)
        {
            try
            {
                var evento = await repo.GetEventoAsyncById(eventoId, true);

                var results = mapper.Map<EventoDto>(evento);

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
                var eventos = await repo.GetAllEventosAsyncByTema(tema, true);

                var results = mapper.Map<EventoDto>(eventos);

                return Ok(results);
            }
            catch (Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou!");
            }
        }


        [HttpPost] 
        public async Task<IActionResult> Post(EventoDto model)
        {
            try
            {
                var evento = mapper.Map<Evento>(model);

                repo.Add(evento);

                if (await repo.SaveChangesAsync())
                {
                    return Created($"api/evento/{model.Id}", mapper.Map<EventoDto>(evento));
                }

            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Banco de dados falhou: {ex.Message}"); ;
            }

            return BadRequest();
        }

        [HttpPost("upload")]
        public async Task<IActionResult> Upload()
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName;
                    var fullPath = Path.Combine(pathToSave, fileName.Replace("\"", "").Trim());

                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, $"Erro no Upload da imagem: {ex.Message}");
            }
        }


        [HttpPut("{eventoId}")]
        public async Task<IActionResult> Put(int eventoId, EventoDto model)
        {
            try
            {
                var evento = await repo.GetEventoAsyncById(eventoId, false);
                if (evento == null) return NotFound();

                var idLotes = new List<int>();
                var idRedesSociais = new List<int>();

                model.Lotes.ForEach(lote => idLotes.Add(lote.Id));
                model.RedesSocials.ForEach(rede => idRedesSociais.Add(rede.Id));

                var lotes = evento.Lotes.Where(lote => !idLotes.Contains(lote.Id)).ToArray();
                var redes = evento.RedesSocials.Where(rede => !idRedesSociais.Contains(rede.Id)).ToArray();

                if (lotes.Length > 0) repo.DeleteRange(lotes);
                if (redes.Length > 0) repo.DeleteRange(redes);


                mapper.Map(model, evento);

                repo.Update(evento);

                if (await repo.SaveChangesAsync())
                {
                    return Created($"api/evento/{model.Id}", mapper.Map<EventoDto>(evento));
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
