import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-landing',
  styles: `
    :host {
      align-items: center;
      background: #f8fafc;
      display: flex;
      justify-content: center;
      min-height: 100vh;
      padding: 1.5rem;
    }

    section {
      max-width: 36rem;
      text-align: center;
    }

    h1 {
      color: #1e3a8a;
      font-size: clamp(2rem, 6vw, 3.5rem);
      margin: 0;
    }

    img {
      display: block;
      height: auto;
      margin: 0 auto 1.5rem;
      max-width: 100%;
    }

    p {
      color: #4b5563;
      line-height: 1.6;
    }

    button {
      background: #1d4ed8;
      border: 0;
      border-radius: 0.25rem;
      color: #ffffff;
      cursor: pointer;
      font: inherit;
      font-weight: 700;
      margin-top: 1rem;
      padding: 0.75rem 1.25rem;
    }

    button:hover,
    button:focus-visible {
      background: #1e3a8a;
    }
  `,
  template: `
    <section aria-labelledby="landing-title">
      <img
        src="assets/policyquote-home.svg"
        alt="Protected family home"
        width="720"
        height="420"
      />
      <h1 id="landing-title">PolicyQuote</h1>
      <p>Get a clear home insurance quote with less guesswork.</p>
      <button type="button" (click)="openQuote()">Enquire Quote</button>
    </section>
  `,
})
export class LandingComponent {
  private readonly router = inject(Router);

  openQuote(): void {
    void this.router.navigate(['/quote']);
  }
}
