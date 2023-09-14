import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorMsgService {

  constructor() { }

  private errorMessages: { [key: string]: string } = {
    'required': '{{field}} is mandatory.',
    'minlength': '{{field}} needs to have at least {{requiredLength}} characters.',
    'maxlength': '{{field}} needs to have at maximum {{requiredLength}} characters.',
    'invalidCep': 'Invalid CEP.',
    'invalidEmail': 'The Email has already been registered!',
    'equalsTo': 'The fields are not equal',
    'pattern': 'Invalid field pattern'
  };

  getErrorMessage(validatorName: string, replacements: { [key: string]: string }): string {
    const messageTemplate = this.errorMessages[validatorName] || '';
    let message = messageTemplate;
    for (const key in replacements) {
      message = message.replace(`{{${key}}}`, replacements[key]);
    }
    return message;
  }
}
