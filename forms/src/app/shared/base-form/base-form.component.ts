import { Component } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-base-form',
  template: '<div></div>'
})
export abstract class BaseFormComponent {

  form!: FormGroup;

  constructor() {

  }

  ngOnInit() {

  }

  abstract submit(): any;

  onSubmit() {
    if (this.form.valid) {
      this.submit();
    }
    else {
      //alert('Invalid Form');

      /* With Angular Material the code below commented works as expected
      Object.keys(this.form.controls).forEach(field => {
        console.log(field);

        const control = this.form.get(field);

        control?.markAsDirty();
        */

      this.verifyFormValidations(this.form);

    }
  }

  verifyFormValidations(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(field => {
      console.log(field);

      const control = formGroup.get(field);

      control?.markAsDirty();

      if (control instanceof FormGroup || control instanceof FormArray) {
        this.verifyFormValidations(control);
      }
    });
  }

  reset() {
    this.form.reset();
  }



}
