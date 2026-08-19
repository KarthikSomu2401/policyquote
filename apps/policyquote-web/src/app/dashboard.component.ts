import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  styles: `
    :host {
      display: block;
    }

    .dashboard-hero {
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0 auto;
      max-width: 42rem;
      min-height: 60vh;
      text-align: center;
    }

    .dashboard-hero p {
      color: #4b5563;
      line-height: 1.6;
    }

    button {
      background: #1d4ed8;
      border: 0;
      color: #ffffff;
      cursor: pointer;
      margin-top: 1rem;
      padding: 0.75rem 1.25rem;
    }
  `,
  template: `
    <section class="dashboard-hero" aria-labelledby="dashboard-title">
      <h1 id="dashboard-title">Dashboard</h1>
      <p>Simple, dependable home insurance starts with a clear quote.</p>
      <button type="button" (click)="goToQuote()">Quote Now</button>
    </section>
  `,
})
export class DashboardComponent {
  private readonly router = inject(Router);

  goToQuote(): void {
    void this.router.navigate(['/quote']);
  }
}
