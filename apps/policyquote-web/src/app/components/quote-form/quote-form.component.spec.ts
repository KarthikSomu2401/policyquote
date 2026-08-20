import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuoteFormComponent } from './quote-form.component';
import { QuoteRequest } from '../../models/quote.types';

describe('QuoteFormComponent', () => {
  let component: QuoteFormComponent;
  let fixture: ComponentFixture<QuoteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(QuoteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('requires every quote field', () => {
    expect(component.quoteForm.invalid).toBe(true);
    expect(component.quoteForm.controls.customerName.hasError('required')).toBe(
      true,
    );
    expect(component.quoteForm.controls.age.hasError('required')).toBe(true);
    expect(component.quoteForm.controls.propertyType.hasError('required')).toBe(
      true,
    );
    expect(
      component.quoteForm.controls.propertyValue.hasError('required'),
    ).toBe(true);
    expect(component.quoteForm.controls.postcode.hasError('required')).toBe(
      true,
    );
    expect(
      component.quoteForm.controls.previousClaims.hasError('required'),
    ).toBe(true);
  });

  it('emits a typed request when the form is valid', () => {
    const requests: QuoteRequest[] = [];
    component.submitted.subscribe((request) => requests.push(request));
    component.quoteForm.setValue({
      customerName: 'Alex Smith',
      age: 42,
      propertyType: 'House',
      propertyValue: 350000,
      postcode: 'AB1 2CD',
      previousClaims: 0,
    });

    component.submitQuote();

    expect(requests).toEqual([
      {
        customerName: 'Alex Smith',
        age: 42,
        propertyType: 'House',
        propertyValue: 350000,
        postcode: 'AB1 2CD',
        previousClaims: 0,
      },
    ]);
  });
});
