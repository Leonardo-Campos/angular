import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  constructor(private http: HttpClient) { }

  consultaCep(cep: string) {
    cep = cep.replace(/\D/g, '');

    if (cep != "") {
      var validateCep = /^[0-9]{8}$/;

      if (validateCep.test(cep)) {
        return this.http.get(`//viacep.com.br/ws/${cep}/json`)
          .pipe(map((data: any) => data));
      }
    }

    return of(null);
  }
}
