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
  styleUrl: './quote-form.component.scss',
  template: `
    <form data-testid="quote-form" [formGroup]="quoteForm" (ngSubmit)="submitQuote()" novalidate>
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
            data-testid="customer-name-input"
            type="text"
            formControlName="customerName"
            [attr.aria-invalid]="quoteForm.controls.customerName.invalid && quoteForm.controls.customerName.touched"
            aria-required="true"
            [attr.aria-describedby]="quoteForm.controls.customerName.invalid && quoteForm.controls.customerName.touched ? 'customerName-error' : null"
          />
          @if (quoteForm.controls.customerName.invalid && quoteForm.controls.customerName.touched) {
            <span class="validation-message" data-testid="customer-name-error" id="customerName-error">Customer name is required.</span>
          }
        </div>

        <div class="field">
          <label for="age">Age <span class="required-indicator" aria-hidden="true">*</span></label>
          <input
            id="age"
            data-testid="age-input"
            type="number"
            formControlName="age"
            [attr.aria-invalid]="quoteForm.controls.age.invalid && quoteForm.controls.age.touched"
            aria-required="true"
            [attr.aria-describedby]="quoteForm.controls.age.invalid && quoteForm.controls.age.touched ? 'age-error' : null"
          />
          @if (quoteForm.controls.age.invalid && quoteForm.controls.age.touched) {
            <span class="validation-message" data-testid="age-error" id="age-error">Age is required.</span>
          }
        </div>

      </fieldset>

      <fieldset>
        <legend>Property details</legend>

        <div class="field">
          <label for="propertyType">Property type <span class="required-indicator" aria-hidden="true">*</span></label>
          <select
            id="propertyType"
            data-testid="property-type-select"
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
            <span class="validation-message" data-testid="property-type-error" id="propertyType-error">Property type is required.</span>
          }
        </div>

        <div class="field">
          <label for="propertyValue">Property value <span class="required-indicator" aria-hidden="true">*</span></label>
          <input
            id="propertyValue"
            data-testid="property-value-input"
            type="number"
            formControlName="propertyValue"
            [attr.aria-invalid]="quoteForm.controls.propertyValue.invalid && quoteForm.controls.propertyValue.touched"
            aria-required="true"
            [attr.aria-describedby]="quoteForm.controls.propertyValue.invalid && quoteForm.controls.propertyValue.touched ? 'propertyValue-error' : null"
          />
          @if (quoteForm.controls.propertyValue.invalid && quoteForm.controls.propertyValue.touched) {
            <span class="validation-message" data-testid="property-value-error" id="propertyValue-error">Property value is required.</span>
          }
        </div>

        <div class="field">
          <label for="postcode">Postcode <span class="required-indicator" aria-hidden="true">*</span></label>
          <input
            id="postcode"
            data-testid="postcode-input"
            type="text"
            formControlName="postcode"
            [attr.aria-invalid]="quoteForm.controls.postcode.invalid && quoteForm.controls.postcode.touched"
            aria-required="true"
            [attr.aria-describedby]="quoteForm.controls.postcode.invalid && quoteForm.controls.postcode.touched ? 'postcode-error' : null"
          />
          @if (quoteForm.controls.postcode.invalid && quoteForm.controls.postcode.touched) {
            <span class="validation-message" data-testid="postcode-error" id="postcode-error">Postcode is required.</span>
          }
        </div>

        <div class="field">
          <label for="previousClaims">Previous claims <span class="required-indicator" aria-hidden="true">*</span></label>
          <input
            id="previousClaims"
            data-testid="previous-claims-input"
            type="number"
            formControlName="previousClaims"
            [attr.aria-invalid]="quoteForm.controls.previousClaims.invalid && quoteForm.controls.previousClaims.touched"
            aria-required="true"
            [attr.aria-describedby]="quoteForm.controls.previousClaims.invalid && quoteForm.controls.previousClaims.touched ? 'previousClaims-error' : null"
          />
          @if (quoteForm.controls.previousClaims.invalid && quoteForm.controls.previousClaims.touched) {
            <span class="validation-message" data-testid="previous-claims-error" id="previousClaims-error">Previous claims is required.</span>
          }
        </div>
      </fieldset>

      <button type="submit" data-testid="get-quote-button">Get quote</button>
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
