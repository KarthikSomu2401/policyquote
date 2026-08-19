import { Component, inject, output } from '@angular/core';
import { Router } from '@angular/router';
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
      min-width: 0;
    }

    form {
      background: #ffffff;
      border: 1px solid #dbe3ef;
      border-radius: 0.5rem;
      box-shadow: 0 0.5rem 1.5rem rgba(30, 58, 138, 0.06);
      display: flex;
      flex-direction: column;
      gap: 1rem;
      min-width: 0;
      padding: clamp(1rem, 3vw, 1.5rem);
    }

    fieldset {
      background: #f8fafc;
      border: 1px solid #dbe3ef;
      border-radius: 0.35rem;
      display: grid;
      gap: 1rem;
      grid-template-columns: 1fr;
      min-width: 0;
      margin: 0;
      padding: 1rem;
    }

    legend {
      color: #1e3a8a;
      font-weight: 700;
      padding: 0 0.5rem;
    }

    .form-heading {
      color: #1e3a8a;
      font-size: 1.45rem;
      line-height: 1.2;
      margin: 0 0 0.4rem;
    }

    .form-intro,
    .required-note {
      color: #4b5563;
      line-height: 1.6;
      margin: 0;
    }

    .required-indicator {
      color: #b91c1c;
      font-weight: 700;
    }

    .field {
      align-content: start;
      display: flex;
      flex-direction: column;
      gap: 0.35rem;
      min-width: 0;
    }

    label {
      color: #1f2937;
      font-weight: 700;
      line-height: 1.35;
      min-height: 1.35rem;
    }

    input,
    select {
      border: 1px solid #9ca3af;
      border-radius: 0.25rem;
      box-sizing: border-box;
      font: inherit;
      min-height: 2.75rem;
      padding: 0.5rem;
      width: 100%;
    }

    select {
      background: #ffffff;
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
      line-height: 1.35;
      min-height: 1.2rem;
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
      min-height: 2.75rem;
      padding: 0.75rem 1.25rem;
      width: fit-content;
    }

    button:hover,
    button:focus-visible {
      background: #1e3a8a;
    }

    .back-home {
      align-self: flex-start;
      background: transparent;
      border: 1px solid #1d4ed8;
      color: #1e3a8a;
      margin-top: 0;
      text-decoration: none;
    }

    .back-home:hover,
    .back-home:focus-visible {
      background: #eff6ff;
    }

    a:focus-visible,
    button:focus-visible,
    input:focus-visible,
    select:focus-visible {
      outline: 3px solid #60a5fa;
      outline-offset: 2px;
    }

    @media (min-width: 561px) {
      fieldset {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
  `,
  template: `
    <form [formGroup]="quoteForm" (ngSubmit)="submitQuote()" novalidate>
      <div>
        <h2 class="form-heading">Tell us about your home</h2>
        <p class="form-intro">Enter a few details so we can prepare an illustrative estimate.</p>
        <p class="required-note"><span class="required-indicator" aria-hidden="true">*</span> Required field</p>
      </div>

      <fieldset>
        <legend>Customer details</legend>

        <div class="field">
          <label for="customerName">Customer name <span class="required-indicator" aria-hidden="true">*</span></label>
          <input
            id="customerName"
            type="text"
            formControlName="customerName"
            [attr.aria-invalid]="quoteForm.controls.customerName.invalid && quoteForm.controls.customerName.touched"
            aria-required="true"
            [attr.aria-describedby]="quoteForm.controls.customerName.invalid && quoteForm.controls.customerName.touched ? 'customerName-error' : null"
          />
          @if (quoteForm.controls.customerName.invalid && quoteForm.controls.customerName.touched) {
            <span class="validation-message" id="customerName-error">Customer name is required.</span>
          }
        </div>

        <div class="field">
          <label for="age">Age <span class="required-indicator" aria-hidden="true">*</span></label>
          <input
            id="age"
            type="number"
            formControlName="age"
            [attr.aria-invalid]="quoteForm.controls.age.invalid && quoteForm.controls.age.touched"
            aria-required="true"
            [attr.aria-describedby]="quoteForm.controls.age.invalid && quoteForm.controls.age.touched ? 'age-error' : null"
          />
          @if (quoteForm.controls.age.invalid && quoteForm.controls.age.touched) {
            <span class="validation-message" id="age-error">Age is required.</span>
          }
        </div>

      </fieldset>

      <fieldset>
        <legend>Property details</legend>

        <div class="field">
          <label for="propertyType">Property type <span class="required-indicator" aria-hidden="true">*</span></label>
          <select
            id="propertyType"
            formControlName="propertyType"
            [attr.aria-invalid]="quoteForm.controls.propertyType.invalid && quoteForm.controls.propertyType.touched"
            aria-required="true"
            [attr.aria-describedby]="quoteForm.controls.propertyType.invalid && quoteForm.controls.propertyType.touched ? 'propertyType-error' : null"
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
          <label for="propertyValue">Property value <span class="required-indicator" aria-hidden="true">*</span></label>
          <input
            id="propertyValue"
            type="number"
            formControlName="propertyValue"
            [attr.aria-invalid]="quoteForm.controls.propertyValue.invalid && quoteForm.controls.propertyValue.touched"
            aria-required="true"
            [attr.aria-describedby]="quoteForm.controls.propertyValue.invalid && quoteForm.controls.propertyValue.touched ? 'propertyValue-error' : null"
          />
          @if (quoteForm.controls.propertyValue.invalid && quoteForm.controls.propertyValue.touched) {
            <span class="validation-message" id="propertyValue-error">Property value is required.</span>
          }
        </div>

        <div class="field">
          <label for="postcode">Postcode <span class="required-indicator" aria-hidden="true">*</span></label>
          <input
            id="postcode"
            type="text"
            formControlName="postcode"
            [attr.aria-invalid]="quoteForm.controls.postcode.invalid && quoteForm.controls.postcode.touched"
            aria-required="true"
            [attr.aria-describedby]="quoteForm.controls.postcode.invalid && quoteForm.controls.postcode.touched ? 'postcode-error' : null"
          />
          @if (quoteForm.controls.postcode.invalid && quoteForm.controls.postcode.touched) {
            <span class="validation-message" id="postcode-error">Postcode is required.</span>
          }
        </div>

        <div class="field">
          <label for="previousClaims">Previous claims <span class="required-indicator" aria-hidden="true">*</span></label>
          <input
            id="previousClaims"
            type="number"
            formControlName="previousClaims"
            [attr.aria-invalid]="quoteForm.controls.previousClaims.invalid && quoteForm.controls.previousClaims.touched"
            aria-required="true"
            [attr.aria-describedby]="quoteForm.controls.previousClaims.invalid && quoteForm.controls.previousClaims.touched ? 'previousClaims-error' : null"
          />
          @if (quoteForm.controls.previousClaims.invalid && quoteForm.controls.previousClaims.touched) {
            <span class="validation-message" id="previousClaims-error">Previous claims is required.</span>
          }
        </div>
      </fieldset>

      <button class="back-home" type="button" (click)="goHome()">Back to home</button>
      <button type="submit">Get quote</button>
    </form>
  `,
})
export class QuoteFormComponent {
  private readonly router = inject(Router);
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

  goHome(): void {
    void this.router.navigate(['/']);
  }
}
