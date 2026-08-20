import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PropertyType, QuoteRequest } from '../../models/quote.types';

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
  templateUrl: './quote-form.component.html',
  styleUrl: './quote-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
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
