import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  private _filtroLista: string;
  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }


  eventos: any = [];
  eventosFiltrados: any = [];
  imagemLargura = 100;
  imagemMargem = 2;
  mostrarImagem = false;
  

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getEventos();
  }

  getEventos(){
    this.http.get('http://localhost:5000/api/Values').subscribe(response => { this.eventos = response },
                                                                error => { console.log('error') }
                                                               );
  }

  alternarImagem(){
    this.mostrarImagem = !this.mostrarImagem;
  }

  filtrarEventos(filtrarPor: string): any {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  buscarTodos(){
    this.eventosFiltrados = this.eventos;
  }

}
