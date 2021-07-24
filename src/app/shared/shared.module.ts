import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlErrorsDirective } from './directives/validate-form.directive';
import { ControlErrorContainerDirective } from './directives/control-error-container.directive';
import { ControlErrorComponent } from './components/control-error/control-error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormSubmitDirective } from './directives/form-submit.directive';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    ControlErrorsDirective,
    ControlErrorContainerDirective,
    ControlErrorComponent,
    FormSubmitDirective
  ],
  exports: [
    ControlErrorsDirective,
    ControlErrorContainerDirective,
    FormSubmitDirective,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
