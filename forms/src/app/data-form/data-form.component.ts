import { EstadosBr } from './../shared/models/estados-br';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { EnderecoService } from '../shared/services/endereco.service';
import { DropdownService } from '../shared/services/dropdown.service';
import { ThemePalette } from '@angular/material/core';
import { FormValidations } from '../shared/form-validations';

export interface Terms {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subterms?: Terms[];
}


@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss']
})
export class DataFormComponent implements OnInit{

  formulario!: FormGroup;
  estados: EstadosBr[] = [];
  cargos!: any[];
  tecnologias!: any[];
  newsletterOp!: any[];

  terms: Terms = {
    name: 'Accept the Terms',
    completed: false,
    color: 'primary',
    subterms: [
      { name: 'Term 1', completed: false, color: 'primary' },
      { name: 'Term 2', completed: false, color: 'accent' },
      { name: 'Term 3', completed: false, color: 'warn' },
    ],
  };

  termsFormControl = new FormControl('', [(control) => {
    return !control.value ? { 'required': true } : null;
  }]
  );

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.terms.subterms != null && this.terms.subterms.every(t => t.completed);
  }

  someComplete(): boolean {
    if (this.terms.subterms == null) {
      return false;
    }
    return this.terms.subterms.filter(t => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.terms.subterms == null) {
      return;
    }
    this.terms.subterms.forEach(t => (t.completed = completed));
    this.terms.completed = this.allComplete; // Update parent completed
    this.updateFormJson();
  }

  updateFormJson() {
    this.formulario.get('terms')?.updateValueAndValidity();
  }

  updateParentCompleted() {
    if (this.terms.subterms) {
      const allSubtermsCompleted = this.terms.subterms.every(subterm => subterm.completed === true);
      this.formulario.get('terms')?.setValue(allSubtermsCompleted);
    } else {
      this.formulario.get('terms')?.setValue(false);
    }
    this.updateFormJson();
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private enderecoService: EnderecoService,
    private dropDownService: DropdownService) {}

  ngOnInit() {
    this.dropDownService.getEstadosBr()
      .subscribe((dados: any) => {this.estados = dados; console.log(dados)});

    this.cargos = this.dropDownService.getCargos();
    this.tecnologias = this.dropDownService.getTecnologias();
    this.newsletterOp = this.dropDownService.getNewsletter();


    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],

      endereco: this.formBuilder.group({
        cep: [null, Validators.required, FormValidations.cepValidator],
        numero: [null, Validators.required],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),
      cargo: [null],
      tecnologias: [null],
      newsletter: [null],
      termos: [null, Validators.pattern('true')],
      frameworks: [null]
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

  setarCargo() {
    const cargo = {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'};
    this.formulario.get('cargo')?.setValue(cargo);
  }

  setarTecnologias() {
    this.formulario.get('tecnologias')?.setValue(['Java', 'PHP']);
  }

  compararCargos(obj1: any, obj2: any) {
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;
  }
}
