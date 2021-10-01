import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contato } from '../_models/Contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService 
{

  baseURL = 'http://localhost:5000/api/contato';

  constructor(private http: HttpClient) { }

  postEnviarEmail(contato: Contato)
  {
    return this.http.post(this.baseURL, contato);
  }

}
