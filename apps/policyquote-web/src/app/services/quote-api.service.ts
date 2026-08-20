import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { QuoteRequest, QuoteResult } from '../models/quote.types';
import { getRuntimeConfig } from '../config/runtime-config';

@Injectable({ providedIn: 'root' })
export class QuoteApiService {
  private readonly http = inject(HttpClient);

  getQuote(request: QuoteRequest): Observable<QuoteResult> {
    return this.http.post<QuoteResult>(
      `${getRuntimeConfig().apiUrl}/policy/quote`,
      request,
    );
  }
}
