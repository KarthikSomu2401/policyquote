import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-landing',
  styles: `
    :host {
      background: #f8fafc;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      min-height: calc(100vh - 3.75rem);
      overflow-x: hidden;
      width: 100%;
    }

    main {
      box-sizing: border-box;
      max-width: 100%;
      overflow-x: hidden;
    }

    .hero {
      align-items: center;
      display: flex;
      justify-content: center;
      min-height: 32rem;
      overflow: hidden;
      position: relative;
      width: 100%;
    }

    .hero-image,
    .hero-overlay {
      height: 100%;
      inset: 0;
      position: absolute;
      width: 100%;
    }

    .hero-image {
      object-fit: cover;
    }

    .hero-overlay {
      background: rgba(15, 23, 42, 0.64);
    }

    .hero-content {
      box-sizing: border-box;
      color: #ffffff;
      max-width: 42rem;
      padding: 2rem 1.5rem;
      position: relative;
      text-align: center;
      width: 100%;
    }

    .hero-content h1 {
      font-size: clamp(2.25rem, 7vw, 4.5rem);
      line-height: 1.05;
      margin: 0;
    }

    .hero-content p {
      font-size: 1.125rem;
      line-height: 1.6;
      margin: 1rem auto 0;
      max-width: 34rem;
    }

    button {
      background: #1d4ed8;
      border: 2px solid #ffffff;
      border-radius: 0.25rem;
      color: #ffffff;
      cursor: pointer;
      font: inherit;
      font-weight: 700;
      min-height: 2.75rem;
      margin-top: 1.5rem;
      padding: 0.8rem 1.5rem;
    }

    button:hover,
    button:focus-visible {
      background: #1e3a8a;
      outline: 3px solid #bfdbfe;
      outline-offset: 3px;
    }

    .section {
      box-sizing: border-box;
      margin: 0 auto;
      max-width: 72rem;
      padding: 4rem 1.5rem;
      width: 100%;
    }

    .section-heading {
      color: #1e3a8a;
      margin: 0;
      text-align: center;
    }

    .section-intro {
      color: #4b5563;
      line-height: 1.6;
      margin: 0.75rem auto 0;
      max-width: 38rem;
      text-align: center;
    }

    .card-grid,
    .steps {
      display: grid;
      gap: 1rem;
      margin: 2rem 0 0;
    }

    .card-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .reassurance-card {
      background: #ffffff;
      border: 1px solid #dbe3ef;
      border-radius: 0.5rem;
      padding: 1.5rem;
    }

    .icon {
      color: #1d4ed8;
      display: block;
      height: 2rem;
      margin-bottom: 1rem;
      width: 2rem;
    }

    .reassurance-card h3 {
      color: #1f2937;
      margin: 0;
    }

    .reassurance-card p,
    .step p {
      color: #4b5563;
      line-height: 1.6;
      margin-bottom: 0;
    }

    .steps {
      counter-reset: quote-step;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      list-style: none;
      padding: 0;
    }

    .step {
      counter-increment: quote-step;
      position: relative;
      padding: 0.5rem 0 0.5rem 3.5rem;
    }

    .step::before {
      align-items: center;
      background: #dbeafe;
      border-radius: 50%;
      color: #1e3a8a;
      content: counter(quote-step);
      display: flex;
      font-weight: 700;
      height: 2.25rem;
      justify-content: center;
      left: 0;
      position: absolute;
      top: 0;
      width: 2.25rem;
    }

    .step h3 {
      margin: 0;
    }

    @media (max-width: 720px) {
      .card-grid,
      .steps {
        grid-template-columns: 1fr;
      }

      .hero {
        min-height: 28rem;
      }

      .section {
        padding: 3rem 1rem;
      }
    }
  `,
  template: `
    <main>
      <section class="hero" aria-labelledby="landing-title">
        <img
          class="hero-image"
          src="assets/policyquote-home.svg"
          alt="A welcoming home representing the place you want to protect"
          width="720"
          height="420"
        />
        <div class="hero-overlay" aria-hidden="true"></div>
        <div class="hero-content">
          <h1 id="landing-title">A clearer way to protect home</h1>
          <p>PolicyQuote helps you gather the right details and understand your home insurance quote.</p>
          <button type="button" (click)="openQuote()">Enquire Quote</button>
        </div>
      </section>

      <section class="section" aria-labelledby="why-title">
        <h2 class="section-heading" id="why-title">Why choose PolicyQuote?</h2>
        <p class="section-intro">A straightforward starting point for thinking about cover for the home you care about.</p>

        <div class="card-grid">
          <article class="reassurance-card">
            <svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M12 3 19 6v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="1.8"/>
              <path d="m8.5 12 2.2 2.2 4.8-5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/>
            </svg>
            <h3>Clear starting point</h3>
            <p>Share practical details in one focused form before you explore your quote.</p>
          </article>

          <article class="reassurance-card">
            <svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.8"/>
              <path d="M12 7v5l3 2" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/>
            </svg>
            <h3>Designed for busy lives</h3>
            <p>Keep the process focused, with the important questions together and easy to scan.</p>
          </article>

          <article class="reassurance-card">
            <svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d="M5 12.5 9.5 17 19 7.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"/>
            </svg>
            <h3>Useful detail</h3>
            <p>See the information that contributes to your result, so the outcome is easier to follow.</p>
          </article>
        </div>
      </section>

      <section class="section" aria-labelledby="how-title">
        <h2 class="section-heading" id="how-title">How it works</h2>
        <ol class="steps">
          <li class="step">
            <h3>Tell us about home</h3>
            <p>Enter a few details about you and the property.</p>
          </li>
          <li class="step">
            <h3>Review the details</h3>
            <p>Check the information before requesting your quote.</p>
          </li>
          <li class="step">
            <h3>See your result</h3>
            <p>Review the premium, score, and factors in one place.</p>
          </li>
        </ol>
      </section>
    </main>
  `,
})
export class LandingComponent {
  private readonly router = inject(Router);

  openQuote(): void {
    void this.router.navigate(['/quote']);
  }
}
