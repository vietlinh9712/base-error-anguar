
import { InjectionToken } from '@angular/core';


export const defaultErrors = {
  required: () => `This field is required`,
  minlength: (err: { requiredLength: number, actualLength: number }) => `Expect ${err.requiredLength} character! present: ${err.actualLength}`
}

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => defaultErrors
});


