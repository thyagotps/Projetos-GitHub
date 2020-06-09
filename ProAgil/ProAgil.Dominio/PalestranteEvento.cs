using System;
using System.Collections.Generic;
using System.Text;

namespace ProAgil.Dominio
{
    public class PalestranteEvento
    {
        public int PalestranteId { get; set; }

        public Palestrante Palestrante { get; set; }

        public int EventoId { get; set; }

        public Evento Evento { get; set; }
    }
}
