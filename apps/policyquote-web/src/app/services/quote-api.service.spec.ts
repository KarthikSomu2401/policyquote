import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { QuoteApiService } from './quote-api.service';
import { QuoteRequest, QuoteResult } from '../models/quote.types';
import { describe, expect, it, afterEach, beforeEach } from '@jest/globals';


const quoteRequest: QuoteRequest = {
  customerName: 'Alex Smith',
  age: 42,
  propertyType: 'House',
  propertyValue: 350000,
  postcode: 'AB1 2CD',
  previousClaims: 0,
};

const quoteResult: QuoteResult = {
  customerName: 'Alex Smith',
  annualPremium: 360,
  riskScore: 0,
  appliedFactors: [],
};

describe('QuoteApiService', () => {
  let service: QuoteApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    globalThis.__POLICYQUOTE_RUNTIME_CONFIG__ = {
      apiUrl: 'http://localhost:3000',
    };

    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(QuoteApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    globalThis.__POLICYQUOTE_RUNTIME_CONFIG__ = undefined;
  });

  it('posts the quote request to the configured API URL', () => {
    let response: QuoteResult | undefined;

    service.getQuote(quoteRequest).subscribe((result) => {
      response = result;
    });

    const req = httpMock.expectOne('http://localhost:3000/policy/quote');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(quoteRequest);

    req.flush(quoteResult);

    expect(response).toEqual(quoteResult);
  });
});
