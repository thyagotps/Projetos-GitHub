using System.ComponentModel.DataAnnotations;

namespace ProAgil.WebAPI.Dtos
{
    public class RedeSocialDto
    {
        public int Id { get; set; }

        [Required]
        public string Nome { get; set; }

        [Required (ErrorMessage = "Campo {0} obrigatório")]
        public string URL { get; set; }

    }
}
