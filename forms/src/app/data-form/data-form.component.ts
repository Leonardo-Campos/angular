import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { EnderecoService } from '../shared/services/endereco.service';


@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent implements OnInit{

  formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private enderecoService: EnderecoService) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],

      endereco: this.formBuilder.group({
        cep: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      })
    });
  }

  onSubmit() {
    console.log(this.formulario.value);

    if(this.formulario.valid) {
      this.http.post('enderecoServer/formUsuario', JSON.stringify(this.formulario.value))
      .pipe(map(res => res))
      .subscribe(dados => {
        console.log(dados);
        this.resetar();
      });
    } else {
      this.verificaValidacoesForm(this.formulario);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);
      controle?.markAsTouched();
      if (controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

  resetar() {
    this.formulario.reset();
  }

  consultaCEP() {
    const cep = this.formulario.get('endereco.cep')?.value;

    if (cep != null && cep !== '') {
      this.enderecoService.consultaCep(cep)
        .subscribe(data => this.populaDados(data));
    }
  }

  populaDados(dados: any) {
    this.formulario.patchValue({
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

  resetarDataForm() {
    this.formulario.patchValue({
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
