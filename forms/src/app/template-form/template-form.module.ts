// import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { TemplateFormComponent } from './template-form.component';


@NgModule({
  declarations: [
    TemplateFormComponent
  ],
  imports: [
    CommonModule,
    // FlexLayoutModule,
    SharedModule
  ]
})
export class TemplateFormModule { }
