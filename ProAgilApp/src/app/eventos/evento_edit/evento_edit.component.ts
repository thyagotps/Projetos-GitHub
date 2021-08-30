import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/_models/Evento';
import { EventoService } from 'src/app/_services/evento.service';

@Component({
  selector: 'app-evento_edit',
  templateUrl: './evento_edit.component.html',
  styleUrls: ['./evento_edit.component.css']
})
export class Evento_editComponent implements OnInit {

  titulo = 'Evento Edição';
  evento: Evento = new Evento();
  imagemURL = '/assets/images/upload.png';
  registerForm: FormGroup;
  fileNameToUpdate: string;
  file: File;
  dataAtual: string;

  get lotes(): FormArray
  {
    return <FormArray>this.registerForm.get('lotes');
  }

  get redesSocials(): FormArray
  {
    return <FormArray>this.registerForm.get('redesSocials');
  }
  

  constructor(
    private eventoService: EventoService
  , private router: ActivatedRoute
  , private fb: FormBuilder
  , private localeService: BsLocaleService
  , private toastr: ToastrService
  
  ) { 
    this.localeService.use('pt-br');
  }

  ngOnInit()
  {
    this.validation();
    this.carregarEvento();
  }

  carregarEvento()
  {
    const idEvento = +this.router.snapshot.paramMap.get('id');
    //console.log('ev');
    //console.log(idEvento);

    this.eventoService.getAllEventosById(idEvento)
    .subscribe
    (
      (evento: Evento) => 
      {
        this.evento = Object.assign({}, evento);
        console.log(this.evento);
        this.fileNameToUpdate = evento.imageURL.toString();
        this.imagemURL = `http://localhost:5000/resources/images/${this.evento.imageURL}?_ts=${this.dataAtual}`;
        this.evento.imageURL = '';

        console.log('fdp');
        this.evento.lotes.forEach(lote => {
          console.log(lote);
        });

        this.registerForm.patchValue(this.evento);

        this.evento.lotes.forEach(lote => {
          this.lotes.push(this.criaLote(lote));
        });

        this.evento.redesSocials.forEach(redeSocial => {
          this.redesSocials.push(this.criaRedeSocial(redeSocial));
        });

      }
    );
  }

  validation() {
    this.registerForm = this.fb.group({
      id: [],
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', Validators.required],
      dataEvento: ['', Validators.required],
      imagemURL: [''],
      qtdPessoas: ['', [Validators.required, Validators.max(12000)]],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],

      lotes: this.fb.array([]),

      redesSocials: this.fb.array([]) 
    });
  }

  criaLote(lote: any): FormGroup
  {
    return this.fb.group({
      id: [lote.id],
      nome:[lote.nome, Validators.required],
      quantidade:[lote.quantidade, Validators.required],
      preco: [lote.preco, Validators.required],
      dataInicio:[lote.dataInicio],
      dataFim:[lote.dataFim]
    });
  }

  adicionarLote()
  {
    this.lotes.push(this.criaLote({id: 0}));
  }

  adicionarRedeSocial()
  {
    this.redesSocials.push(this.criaRedeSocial({id: 0}));
  }

  removerLote(id: number)
  {
    this.lotes.removeAt(id);
  }

  removerRedeSocial(id: number)
  {
    this.redesSocials.removeAt(id);
  }

  criaRedeSocial(redeSocial: any): FormGroup{
    return this.fb.group({
      id: [redeSocial.id],
      nome:[redeSocial.nome, Validators.required],
      url: [redeSocial.url, Validators.required]
    });
  }

  onFileChange(file: FileList)
  {
    const reader = new FileReader();
    reader.onload = (event: any) => this.imagemURL = event.target.result;
    this.file = (event.target as HTMLInputElement).files[0];
    reader.readAsDataURL(file[0]);
  }

  uploadImagem()
  {
    

    if(this.registerForm.get('imagemURL').value != '')
    {
      this.eventoService.postUpload(this.file, this.fileNameToUpdate)
      .subscribe
      (
        () =>
        {
          this.dataAtual = new Date().getMilliseconds().toString();
          this.imagemURL = `http://localhost:5000/resources/images/${this.evento.imageURL}?_ts=${this.dataAtual}`;
        }
      );
    }

   
  }

  salvarEvento()
  {
    this.evento = Object.assign({id: this.evento.id}, this.registerForm.value);

    this.evento.imageURL = this.fileNameToUpdate;

    this.uploadImagem();

    console.log('aqui');
    console.log(this.evento);

    this.eventoService.putEvento(this.evento)
      .subscribe
      (
       () => 
       {
         this.toastr.success('Editado com sucesso!');
       }, error =>
       {
        this.toastr.error(`Erro ao editar: ${error}`);
       }
      );

  }

}
