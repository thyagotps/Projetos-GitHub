import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  titulo: "Login";
  model: any = {};

  constructor(private authService: AuthService,
              public router: Router,
              private toastr: ToastrService) { }

  ngOnInit()
  {
    if(localStorage.getItem('token') != null)
    {
      this.router.navigate(['/dashboard']);
    }
  }

  login()
  {
    //console.log();

    this.authService.login(this.model).subscribe
    (
      () => {
        this.router.navigate(['/dashboard']);
        this.toastr.success('Logado!');
      }, 
      error => {
        this.toastr.error('Falha ao logar!');
      }
    )

  }

}
