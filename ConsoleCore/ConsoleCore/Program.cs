using ConsoleCore.Entities;
using System;

namespace ConsoleCore
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Bem vindo ao dotNetCore!");

            Console.WriteLine("-- Jogo --");

            var jogo = new Jogo(
                                    new Jogador1("Thyago"),
                                    new Jogador2()
                                );

            jogo.IniciarJogo();
            Console.ReadKey();
        }
    }
}
