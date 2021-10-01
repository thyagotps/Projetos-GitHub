import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Contato } from '../_models/Contato';
import { ContatoService } from '../_services/contato.service';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.scss']
})
export class ContatosComponent implements OnInit {
  
  titulo = 'Contatos';
  registerForm: FormGroup;
  contato: Contato;

  constructor(private fb: FormBuilder,
              private contatoService: ContatoService,
              private toastr: ToastrService) { }

  ngOnInit() 
  {
    this.validacao();
  }

  validacao()
  {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      assunto: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  enviarEmail()
  {
    //let email: string = this.registerForm.get('email').value;
    //let assunto: string = this.registerForm.get('assunto').value;
    this.contato = Object.assign({}, this.registerForm.value);
    console.log("Log - enviarEmail()");
    console.log(this.contato.email);
    console.log(this.contato.assunto);

    this.contatoService.postEnviarEmail(this.contato).subscribe
    (
      () =>
      {
        this.toastr.success('Contato enviado!');
      }
    , error => {
      console.log('asf' + error.error);
      this.toastr.error('Erro ao enviar contato!')
    }
    );
   
  }

}
