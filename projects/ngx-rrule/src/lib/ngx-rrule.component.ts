import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgxRruleService} from './ngx-rrule.service';

@Component({
  selector: 'ngx-rrule',
  templateUrl: './ngx-rrule.component.html',
  styles: [],
  providers: [{provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => NgxRruleComponent), multi: true}]
})
export class NgxRruleComponent implements OnInit, ControlValueAccessor {
  @Input() hideStart = false;
  @Input() hideEnd = false;
  public form: FormGroup;
  private propagateChange;
  constructor(private formBuilder: FormBuilder,
              private  service: NgxRruleService) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      start: {},
      repeat: {},
      end: {},
    });
    this.form.valueChanges.subscribe(() => this.onFormChange());
  }

  writeValue = (input: any): void => {
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  onFormChange = () => {
    let rRule;
    try {
      rRule = this.service.computeRRule({...this.form.value, options: {}});
    } catch (err) {
      console.error(err);
    }
    this.propagateChange({
      raw: this.form.value,
      rRule
    });
  }
}