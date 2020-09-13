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
    public class PalestranteController : ControllerBase
    {
        private readonly IProAgilRepositorio repo;

        public PalestranteController(IProAgilRepositorio repo)
        {
            this.repo = repo;
        }

        [HttpGet("{palestranteId}")]
        public async Task<IActionResult> Get(int palestranteId)
        {
            try
            {
                var results = await repo.GetPalestrantesAsyncById(palestranteId, true);

                return Ok(results);
            }
            catch (Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou!");
            }
        }

        [HttpGet("getByNome/{palestranteNome}")]
        public async Task<IActionResult> Get(string palestranteNome)
        {
            try
            {
                var results = await repo.GetAllPalestrantesAsyncByName(palestranteNome, true);

                return Ok(results);
            }
            catch (Exception)
            {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou!");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Palestrante model)
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
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de dados falhou!"); 
            }

            return BadRequest();
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Palestrante model)
        {
            try
            {
                var palestrante = await repo.GetPalestrantesAsyncById(id, false);
                if (palestrante == null) return NotFound();

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


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var palestrante = await repo.GetPalestrantesAsyncById(id, false);
                if (palestrante == null) return NotFound();

                repo.Delete(palestrante);

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
