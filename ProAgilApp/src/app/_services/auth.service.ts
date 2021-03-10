import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators'
import { User } from '../_models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = "http://localhost:5000/api/user/";
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) { }

  login(model: User)
  {
    return this.http.post(`${this.baseUrl}login`, model).pipe(
      map
      ((response: any) => 
        {
          const user = response;
          if(user)
          {
            localStorage.setItem('token', user.token);
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
          }
        }
      )
    );
  }


  register(model: User)
  {
    return this.http.post(`${this.baseUrl}register`, model);
  }


  loggedIn()
  {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

}
