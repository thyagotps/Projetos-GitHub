import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_models/User';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup;
  user: User;

  constructor(public fb: FormBuilder,
              private toastr: ToastrService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit()
  {
    this.validation();
  }

  validation()
  {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', Validators.required],

      //formGroupName="passwords"
      passwords: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', Validators.required]
      }, {validator: this.compararSenhas})
    });
  }

  compararSenhas(fb: FormGroup)
  {
    const confimacaoSenha = fb.get('confirmPassword');
    if(confimacaoSenha.errors == null || 'mismatch' in confimacaoSenha.errors)
    {
      if(fb.get('password').value != confimacaoSenha.value)
      {
        confimacaoSenha.setErrors({mismatch: true});
      }
      else
      {
        confimacaoSenha.setErrors(null);
      }
    }
  }

  cadastrarUsuario()
  {
    //console.log('Cadastrar usuário');

    if(this.registerForm.valid)
    {
      this.user = Object.assign({password: this.registerForm.get('passwords.password').value}, this.registerForm.value);
      //console.log(this.user);

     this.authService.register(this.user).subscribe(
       () => {
         this.router.navigate(['/user/login']);
         this.toastr.success('Cadastro realizado com sucesso!');
       },
       error => {
         const erro = error.error;
          //console.log(erro);
          erro.forEach(element => {
          switch (element.code) {
            case 'DuplicateUserName':
              this.toastr.error('Já existe cadastro no sistema!');
              break;
            default:
              this.toastr.error(`Erro ao cadastrar: CODE: ${element.code}`);
              break;
          }
        });
       }
     );
    }

  }

}
