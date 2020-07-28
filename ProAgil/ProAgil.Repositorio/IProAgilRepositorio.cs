using ProAgil.Dominio;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace ProAgil.Repositorio
{
    public interface IProAgilRepositorio
    {
        // Geral
        void Add<T>(T entity) where T : class;
        void Update<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;

        Task<bool> SaveChangesAsync();

        // Eventos
        Task<Evento[]> GetAllEventosAsyncByTema(string tema, bool includePalestrante);
        Task<Evento[]> GetAllEventosAsync(bool includePalestrante);
        Task<Evento> GetEventoAsyncById(int id, bool includePalestrante);

        // Palestrante
        Task<Palestrante[]> GetAllPalestrantesAsyncByName(string nome, bool includeEvento);
        Task<Palestrante> GetPalestrantesAsyncById(int id, bool includeEvento);


    }
}
