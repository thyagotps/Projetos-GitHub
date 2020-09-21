import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventoService } from '../_services/evento.service';
import { Evento } from '../_models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  eventos: Evento[];
  eventosFiltrados: Evento[];
  imagemLargura = 100;
  imagemMargem = 2;
  mostrarImagem = false;
  modalRef: BsModalRef;

  constructor(
    private eventoService: EventoService
  , private modalService: BsModalService
  ) { }

  private _filtroLista: string;
  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }


  ngOnInit() {
    this.getEventos();
  }

  getEventos(){
    this.eventoService.getAllEventos().subscribe(
      (_eventos: Evento[]) =>{
        this.eventos = _eventos;
        this.eventosFiltrados = this.eventos;
        console.log(_eventos);
      }, error => {
        console.log(error);
      });
      
  }

  alternarImagem(){
    this.mostrarImagem = !this.mostrarImagem;
  }

  filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  buscarTodos(){
    this.eventosFiltrados = this.eventos;
  }

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

}
