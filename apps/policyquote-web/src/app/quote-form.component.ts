import { Component, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PropertyType, QuoteRequest } from './quote.types';

type QuoteForm = {
  customerName: FormControl<string>;
  age: FormControl<number | null>;
  propertyType: FormControl<PropertyType | ''>;
  propertyValue: FormControl<number | null>;
  postcode: FormControl<string>;
  previousClaims: FormControl<number | null>;
};

@Component({
  standalone: true,
  selector: 'app-quote-form',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="quoteForm" (ngSubmit)="submitQuote()" novalidate>
      <div>
        <label for="customerName">Customer name</label>
        <input id="customerName" type="text" formControlName="customerName" />
      </div>

      <div>
        <label for="age">Age</label>
        <input id="age" type="number" formControlName="age" />
      </div>

      <div>
        <label for="propertyType">Property type</label>
        <select id="propertyType" formControlName="propertyType">
          <option value="">Select a property type</option>
          <option value="House">House</option>
          <option value="Flat">Flat</option>
          <option value="Bungalow">Bungalow</option>
        </select>
      </div>

      <div>
        <label for="propertyValue">Property value</label>
        <input id="propertyValue" type="number" formControlName="propertyValue" />
      </div>

      <div>
        <label for="postcode">Postcode</label>
        <input id="postcode" type="text" formControlName="postcode" />
      </div>

      <div>
        <label for="previousClaims">Previous claims</label>
        <input id="previousClaims" type="number" formControlName="previousClaims" />
      </div>

      <button type="submit">Get quote</button>
    </form>
  `,
})
export class QuoteFormComponent {
  readonly submitted = output<QuoteRequest>();

  readonly quoteForm: FormGroup<QuoteForm> = new FormGroup<QuoteForm>({
    customerName: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    age: new FormControl<number | null>(null, Validators.required),
    propertyType: new FormControl<PropertyType | ''>('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    propertyValue: new FormControl<number | null>(null, Validators.required),
    postcode: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    previousClaims: new FormControl<number | null>(null, Validators.required),
  });

  submitQuote(): void {
    if (this.quoteForm.invalid) {
      this.quoteForm.markAllAsTouched();
      return;
    }

    const value = this.quoteForm.getRawValue();
    this.submitted.emit({
      customerName: value.customerName,
      age: value.age as number,
      propertyType: value.propertyType as PropertyType,
      propertyValue: value.propertyValue as number,
      postcode: value.postcode,
      previousClaims: value.previousClaims as number,
    });
  }
}
