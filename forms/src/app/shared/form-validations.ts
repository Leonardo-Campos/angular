import { FormArray, FormControl, FormGroup } from '@angular/forms';

export class FormValidations {

  static requiredMinCheckbox(min = 1) {
    const validator = (formArray: FormArray) => {
      /* const values = formArray.controls;
      let totalChecked = 0;
      for (let i = 0; i < values.length; i++) {
        if (values[i].value) {
          totalChecked += 1;
        }
      } */
      const totalChecked = formArray.controls
        .map(v => v.value)
        .reduce((total, current) => current ? total + current : total, 0);
      return totalChecked >= min ? null : { required: true };
    };
    return validator;
  }

  static cepValidator(control: FormControl) {

    const cep = control.value;
    if (cep && cep !== '') {
      const validateCep = /^[0-9]{5}-?[0-9]{3}$/;
      return validateCep.test(cep) ? null : { invalidCep : true };

    }
    return null;
  }


  static equalsTo(otherField: string) {
    const validator = (formControl: FormControl) => {
      if (otherField == null) {
        throw new Error('It is needed to inform a field.');
      }

      if (!formControl.root || !(<FormGroup>formControl.root).controls) {
        return null;
      }

      const field = (<FormGroup>formControl.root).get(otherField);

      if (!field) {
        throw new Error('It is needed to inform a valid field.');
      }

      if (field.value !== formControl.value) {
        return { equalsTo : otherField };
      }

      return null;
    };
    return validator;
  }

  static getErrorMsg(fieldName: string, validatorName: string, validatorValue?: any) {
    const config: { [key: string]: string } = {
      'required': `${fieldName} is mandatory.`,
      'minlength': `${fieldName} needs to have at least ${validatorValue.requiredLength} characters.`,
      'maxlength': `${fieldName} needs to have at maximum ${validatorValue.requiredLength} characters.`,
      'invalidCep': 'Invalid CEP.',
      'invalidEmail': 'The Email has already been registered!',
      'equalsTo': 'The fields are not equal',
      'pattern': 'Invalid field pattern'
    };

    return config[validatorName];
  }

}
