import { Directive, ElementRef } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

@Directive({
  selector: 'form'
})
export class FormSubmitDirective {
  submit$: Observable<Event | unknown> = fromEvent(this.element, 'submit')
    .pipe(tap(() => {
      if (this.element.classList.contains('submitted') === false) {
        this.element.classList.add('submitted');
      }
    }), shareReplay(1));

  constructor(private host: ElementRef<HTMLFormElement>) { }

  get element(): any {
    return this.host.nativeElement;
  }
}
