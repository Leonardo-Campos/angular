import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { Observable, empty } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';

import { FormValidations } from '../shared/form-validations';
import { BrStates } from '../shared/models/br-states';
import { AddressService } from '../shared/services/address.service';
import { DropdownService } from '../shared/services/dropdown.service';
import { ErrorMsgService } from '../shared/services/error-msg.service';
import { VerifyEmailService } from './services/verify-email.service';
import { BaseFormComponent } from '../shared/base-form/base-form.component';
import { Cities } from '../shared/models/cities';

export interface Terms {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subterms?: Terms[];
}

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss'],
})
export class DataFormComponent extends BaseFormComponent implements OnInit {

  // form!: FormGroup;
  states: BrStates[] = [];
  cities: Cities[] = [];
  //states!: Observable<BrStates[]>;
  positions!: any[];
  technologies!: any[];
  newsLetterOptions!: any[];

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
    this.form.get('terms')?.updateValueAndValidity();
  }

  updateParentCompleted() {
    if (this.terms.subterms) {
      const allSubtermsCompleted = this.terms.subterms.every(subterm => subterm.completed === true);
      this.form.get('terms')?.setValue(allSubtermsCompleted);
    } else {
      this.form.get('terms')?.setValue(false);
    }
    this.updateFormJson();
  }

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private addressService: AddressService,
    private dropdownService: DropdownService,
    private verifyEmailService: VerifyEmailService,
    private errorMessageService: ErrorMsgService
  ) {

    super();

  }

  override ngOnInit() {

    //this.verifyEmailService.verifyEmail('email@email.com').subscribe();

    // this.states = this.dropdownService.getStatesBr();
    this.dropdownService.getStatesBr()
      .subscribe(data => this.states = data);

    this.positions = this.dropdownService.getPositions();

    this.technologies = this.dropdownService.getTechnologies();

    this.newsLetterOptions = this.dropdownService.gerNewsLetter();
    /*
    this.dropdownService.getStatesBr()
    .subscribe((data) => {this.states = data});
    */

    /* Option A to start a DATA-DRIVEN FORM
    this.form = new FormGroup({
      name: new FormControl(null),
      email: new FormControl(null)
    });
    */

    /* Option B to start a DATA-DRIVEN FORM */
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(80)]],
      email: [null, [Validators.required, Validators.email], [this.validateEmail.bind(this)]], //value, syncValidation, asyncValidation
      confirmEmail: [null, [FormValidations.equalsTo('email')]],

      address: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        number: [null, Validators.required],
        complement: [],
        street: [null, Validators.required],
        neighborhood: [null, Validators.required],
        city: [null, Validators.required],
        state: [null, Validators.required]
      }),

      position: [null],
      technologies: [null],
      newsletter: ['s'],
      terms: [false, this.atLeastOneTermSelectedValidator()]
    });

    this.form.get('address.cep')?.statusChanges
      .pipe(
        distinctUntilChanged(),
        tap(value => console.log('CEP status: ', value)),
        switchMap(status => status === 'VALID' ?
          this.addressService.consultCEP(this.form.get('address.cep')?.value) :
          empty()
        )
      )
      .subscribe(data => data ? this.populateData(data) : {});

      this.dropdownService.getCities(8).subscribe(console.log);

      this.form.get('address.state')?.valueChanges
        .pipe(
          tap(state => console.log('New State: ', state)),
          map(state => this.states.filter(e => e.abbreviation === state)),
          map(states => states && states.length > 0 ? states[0].id : empty()),
          switchMap((stateId: any) => this.dropdownService.getCities(stateId)),
          tap(console.log)
        )
        .subscribe(cities => this.cities = cities);
  }

  atLeastOneTermSelectedValidator() {
    return (control: FormControl): { [key: string]: boolean } | null => {
      const value: boolean = control.value;
      if (!value) {
        return { required: true };
      }
      if (this.terms.subterms) {
        const atLeastOneSelected = this.terms.subterms.some(subterm => subterm.completed === true);
        return atLeastOneSelected ? null : { atLeastOneSelected: true };
      }
      return null;
    };
  }

  override submit() {
    this.http.post('https://httpbin.org/post', JSON.stringify(this.form.value))
    .pipe(map(data => data))
    .subscribe(data => {
      console.log(data);
      this.reset();
    },
      (error: any) => alert('error'));
  }

  consultCEP() {
    const cep = this.form.get('address.cep')?.value;

    if (cep != null && cep !== '') {
      this.addressService.consultCEP(cep)
        .subscribe(data => this.populateData(data));
    }
  }

  populateData(data: any) {
    this.form.patchValue({
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

  resetDataForm() {
    this.form.patchValue({
      address: {
        complement: null,
        street: null,
        neighborhood: null,
        city: null,
        state: null
      }
    });

    this.form.get('name')?.setValue('Diogo');
  }

  setPosition() {
    const position = { name: 'Dev', level: 'Senior', description: 'Dev Senior' };
    this.form.get('position')?.setValue(position);
  }

  comparePositions(obj1: { name: any; level: any; }, obj2: { name: any; level: any; }) {
    return obj1 && obj2 ? (obj1.name === obj2.name && obj1.level === obj2.level) : obj1 === obj2;
  }

  setTechnologies() {
    this.form.get('technologies')?.setValue(['java', 'php', 'javascript']);
  }

  validateEmail(formControl: FormControl) {
    return this.verifyEmailService.verifyEmail(formControl.value)
      .pipe(map(emailExists => emailExists ? { emailInvalid: true } : null));
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    const errorKeys = Object.keys(control?.errors || {});
    if (errorKeys.length > 0) {
      const firstError = errorKeys[0];
      const replacements = { field: controlName, ...control?.getError(firstError) };
      return this.errorMessageService.getErrorMessage(firstError, replacements);
    }
    return '';
  }

}
