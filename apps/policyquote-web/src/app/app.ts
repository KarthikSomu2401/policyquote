import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppHeaderComponent } from './app-header.component';

@Component({
  standalone: true,
  imports: [AppHeaderComponent, RouterOutlet],
  selector: 'app-root',
  templateUrl: './app.html',
  styles: `
    :host {
      box-sizing: border-box;
      display: block;
      min-height: 100vh;
      width: 100%;
    }
  `,
})
export class App {
  protected title = 'policyquote-web';
}
