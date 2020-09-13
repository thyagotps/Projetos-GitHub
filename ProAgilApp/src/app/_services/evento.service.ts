import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../_models/Evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  baseURL = 'http://localhost:5000/api/evento';

  constructor(private http: HttpClient) { }

  getAllEventos(): Observable<Evento[]>
  {
    return this.http.get<Evento[]>(this.baseURL);
  }

  getAllEventosByTema(tema: string): Observable<Evento[]>
  {
    return this.http.get<Evento[]>('${this.baseURL}/getByTema/${tema}');
  }

  
  getAllEventosById(id: number): Observable<Evento>
  {
    return this.http.get<Evento>('${this.baseURL}/getById/${id}');
  }

}
