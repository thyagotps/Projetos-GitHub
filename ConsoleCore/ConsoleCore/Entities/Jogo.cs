using System;
using System.Collections.Generic;
using System.Text;

namespace ConsoleCore.Entities
{
    public class Jogo
    {
        private readonly IJogador jogador1;

        private readonly IJogador jogador2;

        public Jogo(IJogador jogador1, IJogador jogador2)
        {
            this.jogador1 = jogador1;
            this.jogador2 = jogador2;
        }

        public void IniciarJogo()
        {

            Console.WriteLine(jogador1.Corre());
            Console.WriteLine(jogador1.Chuta());
            Console.WriteLine(jogador1.Passe());

            Console.WriteLine("-- Próximo jogador --");

            Console.WriteLine(jogador2.Corre());
            Console.WriteLine(jogador2.Chuta());
            Console.WriteLine(jogador2.Passe());

        }
    }
}
