using AutoMapper;
using ProAgil.Dominio;
using ProAgil.WebAPI.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProAgil.WebAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Evento, EventoDto>()
                .ForMember(dto => dto.Palestrantes, opt =>
                {
                    opt.MapFrom(dominio => dominio.PalestrantesEventos.Select(prop => prop.Palestrante).ToList());
                })
                .ReverseMap();


            CreateMap<Palestrante, PalestranteDto>().
                ForMember(dto => dto.Eventos, opt =>
                {
                    opt.MapFrom(dominio => dominio.PalestrantesEventos.Select(prop => prop.Evento).ToList());
                })
                .ReverseMap();


            CreateMap<Lote, LoteDto>().ReverseMap();
            CreateMap<RedeSocial, RedeSocialDto>().ReverseMap();
        }
    }
}
