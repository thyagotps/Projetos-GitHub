using System;
using System.Collections.Generic;
using System.Text;

namespace ConsoleCore
{
    public class Jogador2 : IJogador
    {
        public Jogador2()
        {

        }

        public string Corre()
        {
            return "Chaves está correndo.";
        }

        public string Chuta()
        {
            return "Chaves está chutando.";
        }

        public string Passe()
        {
            return "Chaves está passando.";
        }
    }
}
