import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlErrorsDirective } from './directives/validate-form.directive';
import { ControlErrorContainerDirective } from './directives/control-error-container.directive';
import { ControlErrorComponent } from './components/control-error/control-error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  declarations: [
    ControlErrorsDirective,
    ControlErrorContainerDirective,
    ControlErrorComponent
  ],
  exports: [
    ControlErrorsDirective,
    ControlErrorContainerDirective,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SharedModule { }
