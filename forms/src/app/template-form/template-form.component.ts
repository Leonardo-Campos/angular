import { EnderecoService } from './../shared/services/endereco.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

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
    console.log(form);
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
    this.enderecoService.consultaCep(cep).subscribe(data => {
      // if (data) {
      //   this.resetDataForm(form);
      //   this.populateData(data, form);
      // }
    });
  }



  }
