import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { QuoteRequest, QuoteResult } from './quote.types';

@Injectable({ providedIn: 'root' })
export class QuoteApiService {
  private readonly http = inject(HttpClient);

  getQuote(request: QuoteRequest): Observable<QuoteResult> {
    return this.http.post<QuoteResult>('http://localhost:3000/policy/quote', request);
  }
}
