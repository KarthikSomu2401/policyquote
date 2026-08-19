import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppFooterComponent } from './app-footer.component';
import { AppHeaderComponent } from './app-header.component';
import { SideNavComponent } from './side-nav.component';

@Component({
  standalone: true,
  imports: [AppHeaderComponent, AppFooterComponent, RouterModule, SideNavComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'policyquote-web';
}
