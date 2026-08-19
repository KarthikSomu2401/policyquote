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
  styles: `
    :host {
      display: block;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    fieldset {
      border: 1px solid #d1d5db;
      display: grid;
      gap: 1rem;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      margin: 0;
      padding: 1rem;
    }

    legend {
      color: #1e3a8a;
      font-weight: 700;
      padding: 0 0.5rem;
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
    }

    input,
    select {
      border: 1px solid #9ca3af;
      border-radius: 0.25rem;
      box-sizing: border-box;
      font: inherit;
      min-height: 2.5rem;
      padding: 0.5rem;
      width: 100%;
    }

    input:focus,
    select:focus {
      border-color: #1d4ed8;
      outline: 2px solid #bfdbfe;
      outline-offset: 1px;
    }

    input.ng-touched.ng-invalid,
    select.ng-touched.ng-invalid {
      border-color: #b91c1c;
    }

    .validation-message {
      color: #b91c1c;
      font-size: 0.875rem;
    }

    button {
      align-self: flex-start;
      background: #1d4ed8;
      border: 0;
      border-radius: 0.25rem;
      color: #ffffff;
      cursor: pointer;
      font: inherit;
      font-weight: 700;
      padding: 0.75rem 1.25rem;
    }

    button:hover,
    button:focus-visible {
      background: #1e3a8a;
    }

    @media (max-width: 560px) {
      fieldset {
        grid-template-columns: 1fr;
      }
    }
  `,
  template: `
    <form [formGroup]="quoteForm" (ngSubmit)="submitQuote()" novalidate>
      <fieldset>
        <legend>Your details</legend>

        <div class="field">
          <label for="customerName">Customer name</label>
          <input
            id="customerName"
            type="text"
            formControlName="customerName"
            [attr.aria-invalid]="quoteForm.controls.customerName.invalid && quoteForm.controls.customerName.touched"
            aria-describedby="customerName-error"
          />
          @if (quoteForm.controls.customerName.invalid && quoteForm.controls.customerName.touched) {
            <span class="validation-message" id="customerName-error">Customer name is required.</span>
          }
        </div>

        <div class="field">
          <label for="age">Age</label>
          <input
            id="age"
            type="number"
            formControlName="age"
            [attr.aria-invalid]="quoteForm.controls.age.invalid && quoteForm.controls.age.touched"
            aria-describedby="age-error"
          />
          @if (quoteForm.controls.age.invalid && quoteForm.controls.age.touched) {
            <span class="validation-message" id="age-error">Age is required.</span>
          }
        </div>

        <div class="field">
          <label for="propertyType">Property type</label>
          <select
            id="propertyType"
            formControlName="propertyType"
            [attr.aria-invalid]="quoteForm.controls.propertyType.invalid && quoteForm.controls.propertyType.touched"
            aria-describedby="propertyType-error"
          >
            <option value="">Select a property type</option>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
            <option value="Bungalow">Bungalow</option>
          </select>
          @if (quoteForm.controls.propertyType.invalid && quoteForm.controls.propertyType.touched) {
            <span class="validation-message" id="propertyType-error">Property type is required.</span>
          }
        </div>

        <div class="field">
          <label for="propertyValue">Property value</label>
          <input
            id="propertyValue"
            type="number"
            formControlName="propertyValue"
            [attr.aria-invalid]="quoteForm.controls.propertyValue.invalid && quoteForm.controls.propertyValue.touched"
            aria-describedby="propertyValue-error"
          />
          @if (quoteForm.controls.propertyValue.invalid && quoteForm.controls.propertyValue.touched) {
            <span class="validation-message" id="propertyValue-error">Property value is required.</span>
          }
        </div>

        <div class="field">
          <label for="postcode">Postcode</label>
          <input
            id="postcode"
            type="text"
            formControlName="postcode"
            [attr.aria-invalid]="quoteForm.controls.postcode.invalid && quoteForm.controls.postcode.touched"
            aria-describedby="postcode-error"
          />
          @if (quoteForm.controls.postcode.invalid && quoteForm.controls.postcode.touched) {
            <span class="validation-message" id="postcode-error">Postcode is required.</span>
          }
        </div>

        <div class="field">
          <label for="previousClaims">Previous claims</label>
          <input
            id="previousClaims"
            type="number"
            formControlName="previousClaims"
            [attr.aria-invalid]="quoteForm.controls.previousClaims.invalid && quoteForm.controls.previousClaims.touched"
            aria-describedby="previousClaims-error"
          />
          @if (quoteForm.controls.previousClaims.invalid && quoteForm.controls.previousClaims.touched) {
            <span class="validation-message" id="previousClaims-error">Previous claims is required.</span>
          }
        </div>
      </fieldset>

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
