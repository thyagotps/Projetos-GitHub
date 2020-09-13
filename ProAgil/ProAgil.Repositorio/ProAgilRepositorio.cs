using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ProAgil.Dominio;
using Microsoft.EntityFrameworkCore;

namespace ProAgil.Repositorio
{
    public class ProAgilRepositorio : IProAgilRepositorio
    {

        private readonly ProAgilContext proAgilContext;
        

        public ProAgilRepositorio(ProAgilContext context)
        {
            this.proAgilContext = context;
            context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }

        // Geral
        public void Add<T>(T entity) where T : class
        {
            proAgilContext.Add(entity);
        }

        public void Update<T>(T entity) where T : class
        {
            proAgilContext.Update(entity);
        }


        public void Delete<T>(T entity) where T : class
        {
            proAgilContext.Remove(entity);
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await proAgilContext.SaveChangesAsync()) > 0;
        }

        // Eventos       
        public async Task<Evento[]> GetAllEventosAsync(bool includePalestrante = false)
        {
            IQueryable<Evento> query = proAgilContext.Eventos
                                        .Include(c => c.Lotes)
                                        .Include(c => c.RedesSocials);

            if (includePalestrante)
            {
                query = query
                    .Include(c => c.PalestrantesEventos)
                    .ThenInclude(c => c.Palestrante);
            }

            query = query
                .AsNoTracking()
                .OrderByDescending(c => c.DataEvento);

            return await query.ToArrayAsync();
        }

        public async Task<Evento[]> GetAllEventosAsyncByTema(string tema, bool includePalestrante = false)
        {
            IQueryable<Evento> query = proAgilContext.Eventos
                                        .Include(c => c.Lotes)
                                        .Include(c => c.RedesSocials);

            if (includePalestrante)
            {
                query = query
                    .Include(c => c.PalestrantesEventos)
                    .ThenInclude(c => c.Palestrante);
            }

            query = query
                .AsNoTracking()
                .OrderByDescending(c => c.DataEvento).Where(c => c.Tema.ToLower().Contains(tema.ToLower()));

            return await query.ToArrayAsync();
        }

        public async Task<Evento> GetEventoAsyncById(int id, bool includePalestrante = false)
        {
            IQueryable<Evento> query = proAgilContext.Eventos
                                        .Include(c => c.Lotes)
                                        .Include(c => c.RedesSocials);

            if (includePalestrante)
            {
                query = query
                    .Include(c => c.PalestrantesEventos)
                    .ThenInclude(c => c.Palestrante);
            }

            query = query
                .AsNoTracking()
                .OrderByDescending(c => c.DataEvento).Where(c => c.Id == id);

            return await query.FirstOrDefaultAsync();
        }



        // Palestrante
        public async Task<Palestrante[]> GetAllPalestrantesAsyncByName(string nome, bool includeEvento)
        {
            IQueryable<Palestrante> query = proAgilContext.Palestrantes
                                      .Include(c => c.RedesSocials);

            if (includeEvento)
            {
                query = query
                    .Include(c => c.PalestrantesEventos)
                    .ThenInclude(c => c.Evento);
            }

            query = query
                .AsNoTracking()
                .OrderBy(c => c.Nome).Where(c => c.Nome.ToLower().Contains(nome.ToLower()));

            return await query.ToArrayAsync();
        }

        public async Task<Palestrante> GetPalestrantesAsyncById(int id, bool includeEvento)
        {
            IQueryable<Palestrante> query = proAgilContext.Palestrantes
                                       .Include(c => c.RedesSocials);

            if (includeEvento)
            {
                query = query
                    .Include(c => c.PalestrantesEventos)
                    .ThenInclude(c => c.Evento);
            }

            query = query
                .AsNoTracking()
                .OrderBy(c => c.Nome).Where(c => c.Id == id);

            return await query.FirstOrDefaultAsync();
        }
      
    }
}
