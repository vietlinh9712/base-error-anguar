import { Directive, Optional, Inject, ViewContainerRef, ComponentFactoryResolver, ComponentRef, Input, Host, OnInit, OnDestroy } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ControlErrorContainerDirective } from './control-error-container.directive';
import { merge, EMPTY, Observable, Subject } from 'rxjs';
import { FORM_ERRORS } from '../ultilities/form-errors';
import { ControlErrorComponent } from '../components/control-error/control-error.component';
import { FormSubmitDirective } from './form-submit.directive';
import { takeUntil } from 'rxjs/operators';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[formControl], [formControlName]'
})
export class ControlErrorsDirective implements OnInit, OnDestroy {
  ref!: ComponentRef<ControlErrorComponent>;
  container: ViewContainerRef;
  submit$: Observable<Event>;
  @Input() customErrors: any = {};
  private destroy$: Subject<any> = new Subject();

  constructor(
    private vcr: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    @Optional() controlErrorContainer: ControlErrorContainerDirective,
    @Inject(FORM_ERRORS) private errors: any,
    @Optional() @Host() private form: FormSubmitDirective,
    private controlDir: NgControl) {
    this.container = controlErrorContainer ? controlErrorContainer.vcr : vcr;
    this.submit$ = this.form ? this.form.submit$ as any : EMPTY;
  }

  ngOnInit() {
    merge(
      this.submit$,
      this.control.valueChanges
    ).pipe(
      takeUntil(this.destroy$)).subscribe((v) => {
        const controlErrors = this.control.errors;
        if (controlErrors) {
          const firstKey = Object.keys(controlErrors)[0];
          const getError = this.errors[firstKey];
          const text = controlErrors.errorMessage || this.customErrors[firstKey] || getError(controlErrors[firstKey]);
          this.setError(text);
        } else if (this.ref) {
          this.setError(null);
        }
      });
  }

  get control(): any {
    return this.controlDir.control;
  }

  setError(text: string | null) {
    if (!this.ref) {
      const factory = this.resolver.resolveComponentFactory(ControlErrorComponent);
      this.ref = this.container.createComponent(factory);
    }

    this.ref.instance.text = text;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
