import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DataFormComponent } from './data-form.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule, MatPseudoCheckboxModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    DataFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    MatRadioModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatPseudoCheckboxModule,
    NgFor,
    FormsModule,
    MatIconModule
  ]
})
export class DataFormModule { }
