import { Component, OnInit, TemplateRef } from '@angular/core';
import { EventoService } from '../_services/evento.service';
import { Evento } from '../_models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ToastrService } from 'ngx-toastr';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  titulo = 'Eventos';

  eventos: Evento[];
  evento: Evento;
  eventosFiltrados: Evento[];
  imagemLargura = 100;
  imagemMargem = 2;
  mostrarImagem = false;
  modoSalvar = '';
  registerForm: FormGroup;
  bodyDeletarEvento = '';
  file: File;
  fileNameToUpdate: string;
  dataAtual: string;
  

  constructor(
    private eventoService: EventoService
  , private modalService: BsModalService
  , private fb: FormBuilder
  , private localeService: BsLocaleService
  , private toastr: ToastrService
  
  ) { 
    this.localeService.use('pt-br');
  }

  private _filtroLista: string;
  get filtroLista(): string {
    return this._filtroLista;
  }
  set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  

  ngOnInit() {
    this.validation();
    this.getEventos();
  }

  getEventos(){
    this.dataAtual = new Date().getMilliseconds().toString();

    this.eventoService.getAllEventos().subscribe(
      (_eventos: Evento[]) =>{
        this.eventos = _eventos;
        this.eventosFiltrados = this.eventos;
        console.log(_eventos);
      }, error => {
        this.toastr.error(`Erro ao carregar: ${error}`);
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

  openModal(template: any){
    this.registerForm.reset();
    template.show();
  }

  editarEvento(evento: Evento, template: any)
  {
    this.modoSalvar = 'put';
    this.openModal(template);
    this.evento = Object.assign({}, evento);
    this.fileNameToUpdate = evento.imageURL.toString();
    this.evento.imageURL = '';
    this.registerForm.patchValue(this.evento);
  }

  novoEvento(template: any)
  {
    this.modoSalvar = 'post';
    this.openModal(template);
    
  }

  validation() {
    this.registerForm = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      imageURL: ['', Validators.required],
      qtdPessoas: ['', [Validators.required, Validators.max(12000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  salvarAlteracao(template: any)
  {
    if(this.registerForm.valid)
    {

      if(this.modoSalvar == 'post')
      {
        this.evento = Object.assign({}, this.registerForm.value);

        this.uploadImagem();

        this.eventoService.postEvento(this.evento).subscribe
        (
          (novoEvento: Evento) => {
            console.log(novoEvento);
            template.hide();
            this.getEventos();
            this.toastr.success('Inserido com sucesso!');
          }, error => {
            console.log(error);
            this.toastr.error(`Erro ao inserir: ${error}`);
          }
        )
      }

      if(this.modoSalvar == 'put')
      {
        this.evento = Object.assign({id: this.evento.id}, this.registerForm.value);

        this.uploadImagem();

        this.eventoService.putEvento(this.evento).subscribe
        (
          (novoEvento: Evento) => {
            console.log(novoEvento);
            template.hide();
            this.getEventos();
            this.toastr.success('Editado com sucesso!');
          }, error => {
            console.log(error);
            this.toastr.error(`Erro ao editar: ${error}`);
          }
        )
      }
    }
  }

  excluirEvento(evento: Evento, template: any)
  {
    this.openModal(template);
    this.evento = evento;
    this.bodyDeletarEvento = `Tem certeza que deseja excluir o Evento: ${this.evento.tema}, Código: ${this.evento.id}`;
  }

  confirmeDelete(template: any)
  {
    this.eventoService.deleteEvento(this.evento.id).subscribe(
      () => {
        template.hide();
        this.getEventos();
        this.toastr.success('Deletado com sucesso!');
      }, error => {
        this.toastr.error('Erro ao deletar!');
        console.log(error);
      }
    );
  }

  onFileChanged(event){
    const reader = new FileReader();
    
    if (event.target.files && event.target.files.length)
    {
      this.file = event.target.files;
      console.log(this.file);
    }
  }

  uploadImagem()
  {
    if(this.modoSalvar == 'post')
    {
      const nomeArquivo = this.evento.imageURL.split("\\", 3);
      this.evento.imageURL = nomeArquivo[2];
  
      this.eventoService.postUpload(this.file, nomeArquivo[2])
        .subscribe(
          () => {
            this.dataAtual = new Date().getMilliseconds().toString();
            this.getEventos();
          }
        );
    }

    if(this.modoSalvar == 'put')
    {
      if (this.fileNameToUpdate == '')
      {
        const nomeArquivo = this.evento.imageURL.split("\\", 3);
        this.evento.imageURL = nomeArquivo[2];
        this.fileNameToUpdate = this.evento.imageURL;
      }
      else
      {
        this.evento.imageURL = this.fileNameToUpdate;
      }

      this.eventoService.postUpload(this.file, this.fileNameToUpdate)
        .subscribe(
          () => {
            this.dataAtual = new Date().getMilliseconds().toString();
            this.getEventos();
          }
        );
    }
   
  }

}
