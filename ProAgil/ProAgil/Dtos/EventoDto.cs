using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProAgil.WebAPI.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }

        [Required (ErrorMessage = "Local é obrigatório")]
        [StringLength (100, MinimumLength = 4, ErrorMessage = "Local deve ser entre 4 e 100 caracteres")]
        public string Local { get; set; }

        public string DataEvento { get; set; }

        [Required (ErrorMessage = "Tema é obrigatório")]
        public string Tema { get; set; }

        [Range( 2, 120000, ErrorMessage = "A quantidade deve ser entre 2 e 120000")]
        public int QtdPessoas { get; set; }

        public string ImageURL { get; set; }

        [Phone]
        public string Telefone { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        public List<LoteDto> Lotes { get; set; }

        public List<RedeSocialDto> RedesSocials { get; set; }

        public List<PalestranteDto> Palestrantes { get; set; }
    }
}
