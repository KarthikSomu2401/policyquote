import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  template: `
    <section aria-labelledby="dashboard-title">
      <h1 id="dashboard-title">Dashboard</h1>
    </section>
  `,
})
export class DashboardComponent {}
