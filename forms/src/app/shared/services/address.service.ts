import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  consultCEP(cep: string) {

    console.log(cep);

    cep = cep.replace(/\D/g, '');

    if (cep !== '') {
      const validateCep = /^[0-9]{8}$/;

      if (validateCep.test(cep)) {
        return this.http.get(`//viacep.com.br/ws/${cep}/json`);
      }
    }

    return of({});
  }
}
