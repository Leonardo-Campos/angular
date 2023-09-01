import { EnderecoService } from './../shared/services/endereco.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent {

  usuario: any = {
    nome: 'Leonardo',
    email: 'leonardo@gmail.com'
  }

  constructor(
    private http: HttpClient,
    private enderecoService: EnderecoService
  ){}

  onSubmit(form: any) {
    // console.log(form);

    this.http.post('enderecoServer/formUsuario', JSON.stringify(form.value))
    .pipe(map(res => res))
    .subscribe(dados => console.log(dados));
  }

  verificaValidTouched(campo: any) {
    return !campo.valid && campo.touched;
  }

  applyErrorCss(campo: any) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo)
    }
  }

  consultaCEP(cep: any, form: any) {
    this.enderecoService.consultaCep(cep).subscribe(dados => {
      if (dados) {
        this.resetarDataForm(form);
        this.populaDados(dados, form);
      }
    });
  }


  populaDados(dados: any, form: any) {
    form.form.patchValue({
      endereco: {
        cep: dados.cep,
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf
      }
    });
  }

  resetarDataForm(form: any) {
    form.form.patchValue({
      endereco: {
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }




  }
