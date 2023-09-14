import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AddressService } from '../shared/services/address.service';


@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent implements OnInit {

  user: any = {
    name: 'Diogo',
    email: 'diogo@gmail.com'
  };


  constructor(
    private http: HttpClient,
    private addressService: AddressService
  ) {

  }

  ngOnInit() {

  }

  onSubmit(submitForm: any) {
    console.log(submitForm);

    console.log(this.user);

    this.http.post('https://httpbin.org/post', JSON.stringify(submitForm.value))
      .pipe(map(data => data))
      .subscribe(data => {
        console.log(data);
        submitForm.form.reset();
      });
  }

  resetForm(form: any) {
    form.reset();
    this.resetDataForm(form);
  }


  verifyValidTouched(field: any) {
    return !field.valid && field.touched;
  }

  applyErrorCss(field: any) {
    return {
      'has-error': this.verifyValidTouched(field),
      'has-feedback': this.verifyValidTouched(field)
    }
  }

  consultCEP(cep: any, form: any) {
    this.addressService.consultCEP(cep).subscribe(data => {
      if (data) {
        this.resetDataForm(form);
        this.populateData(data, form);
      }
    });
  }

  populateData(data: any, form: any) {
    /*form.setValue({
      name: form.value.name,
      email: form.value.email,
      address: {
        cep: data.cep,
        number: '',
        complement: data.complemento,
        street: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf
      }
    });*/
    form.form.patchValue({
      address: {
        cep: data.cep,
        complement: data.complemento,
        street: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf
      }
    });
  }

  resetDataForm(form: any) {
    form.form.patchValue({
      address: {
        complement: null,
        street: null,
        neighborhood: null,
        city: null,
        state: null
      }
    });
  }

}
