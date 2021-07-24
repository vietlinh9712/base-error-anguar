import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CValidators } from 'src/app/shared/ultilities/custom-validator';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form: FormGroup;

  constructor(
    fb: FormBuilder
  ) {
    this.form = fb.group({
      test: [null, [CValidators.required('Không được để trống'), CValidators.minLength(10, 'Tối thiểu 10 kí tự')]]
    });
  }

  ngOnInit() { }
}
