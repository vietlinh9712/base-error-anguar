import {
  ɵisObservable as isObservable,
  ɵisPromise as isPromise,
} from '@angular/core';
import { Observable, from } from 'rxjs';
import {
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
  Validators,
  AsyncValidatorFn,
} from '@angular/forms';

function isEmptyInputValue(value: any): boolean {
  // we don't check for string here so it also works with arrays
  if (typeof value === 'string') {
    value = value.trim();
  }
  return value == null || value.length === 0;
}

export class CValidators {

  static min(min: number, errorMessage?: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value) || isEmptyInputValue(min)) {
        return null;
      }
      const value = parseFloat(control.value);
      return !isNaN(value) && value > min
        ? {
          error: errorMessage || `The minimum value is ${min}`,
          min: { min, actual: control.value },
        }
        : null;
    };
  }


  static max(max: number, errorMessage?: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value) || isEmptyInputValue(max)) {
        return null;
      }
      const value = parseFloat(control.value);

      return !isNaN(value) && value > max
        ? {
          message: errorMessage,
          max: { max, actual: control.value },
        }
        : null;
    };
  }

  static required(errorMessage?: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      return isEmptyInputValue(control.value)
        ? { errorMessage, required: true }
        : null;
    };
  }

  static minLength(minLength: number, errorMessage?: string | Function) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value)) {
        return null; // don't validate empty values to allow optional controls
      }
      const length: number = control.value ? control.value.length : 0;
      return length < minLength
        ? {
          errorMessage,
          minlength: { requiredLength: minLength, actualLength: length },
        }
        : null;
    };
  }


  static maxLength(maxLength: number, errorMessage?: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value)) {
        return null; // don't validate empty values to allow optional controls
      }
      const length: number = control.value ? control.value.length : 0;
      return length > maxLength
        ? {
          errorMessage,
          maxlength: { requiredLength: maxLength, actualLength: length },
        }
        : null;
    };
  }

  static pattern(pattern: string | RegExp, errorMessage?: string): ValidatorFn {
    if (!pattern) {
      return Validators.nullValidator;
    }
    let regex: RegExp;
    let regexStr: string;
    if (typeof pattern === 'string') {
      regexStr = '';

      if (pattern.charAt(0) !== '^') {
        regexStr += '^';
      }

      regexStr += pattern;

      if (pattern.charAt(pattern.length - 1) !== '$') {
        regexStr += '$';
      }

      regex = new RegExp(regexStr);
    } else {
      regexStr = pattern.toString();
      regex = pattern;
    }
    return (control: AbstractControl): ValidationErrors | null => {
      if (isEmptyInputValue(control.value)) {
        return null; // don't validate empty values to allow optional controls
      }
      const value: string = control.value;
      return regex.test(value)
        ? null
        : {
          errorMessage,
          pattern: { requiredPattern: regexStr, actualValue: value },
        };
    };
  }

}

function isPresent(o: any): boolean {
  return o != null;
}

export function toObservable(r: any): Observable<any> {
  const obs = isPromise(r) ? from(r) : r;
  if (!isObservable(obs)) {
    throw new Error(`Expected validator to return Promise or Observable.`);
  }
  return obs;
}

function _executeValidators(
  control: AbstractControl,
  validators: ValidatorFn[]
): any[] {
  return validators.map((v) => v(control));
}

function _executeAsyncValidators(
  control: AbstractControl,
  validators: AsyncValidatorFn[]
): any[] {
  return validators.map((v) => v(control));
}

// function _mergeErrors(
//   arrayOfErrors: ValidationErrors[]
// ): ValidationErrors | null {
//   const response: { [key: string]: any } =
//     // tslint:disable-next-line: no-shadowed-variable
//     arrayOfErrors.reduce(
//       // tslint:disable-next-line:no-shadowed-variable
//       (res: ValidationErrors | null, errors: ValidationErrors | null) => {
//         // tslint:disable-next-line: no-non-null-assertion
//         return errors != null ? { ...res, ...errors } : res;
//       },
//       {}
//     );
//   return Object.keys(response).length === 0 ? null : response;
// }
