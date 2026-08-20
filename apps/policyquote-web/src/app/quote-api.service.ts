import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { QuoteRequest, QuoteResult } from './quote.types';
import { getRuntimeConfig } from './runtime-config';

@Injectable({ providedIn: 'root' })
export class QuoteApiService {
  private readonly http = inject(HttpClient);

  getQuote(request: QuoteRequest): Observable<QuoteResult> {
    return this.http.post<QuoteResult>(`${getRuntimeConfig().apiUrl}/policy/quote`, request);
  }
}
