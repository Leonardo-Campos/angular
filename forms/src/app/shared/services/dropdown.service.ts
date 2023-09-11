import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EstadosBr } from '../models/estados-br';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private httpClient: HttpClient) { }

  getEstadosBr() {
    return this.httpClient.get('assets/dados/estadosbr.json');
  }

  getCargos() {
    return [
      {nome: 'Dev', nivel: 'Junior', desc: 'Dev Jr'},
      {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'},
      {nome: 'Dev', nivel: 'Senior', desc: 'Dev Sr'}
    ];
  }

  getTecnologias() {
    return [
      {nome: 'Java', desc: 'Java'},
      {nome: 'JavaScript', desc: 'JavaScript'},
      {nome: 'PHP', desc: 'PHP'},
      {nome: 'Ruby', desc: 'Ruby'}
    ];
  }
}
