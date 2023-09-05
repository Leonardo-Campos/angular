import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DataFormComponent } from './data-form.component';



@NgModule({
  declarations: [
    DataFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class DataFormModule { }
