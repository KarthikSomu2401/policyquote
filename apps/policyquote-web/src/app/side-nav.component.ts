import { Component, OnDestroy, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-side-nav',
  imports: [RouterLink],
  template: `
    <button
      type="button"
      [attr.aria-expanded]="sideNavOpen()"
      aria-controls="main-navigation"
      (click)="toggleSideNav()"
    >
      {{ sideNavOpen() ? 'Hide navigation' : 'Show navigation' }}
    </button>

    <nav id="main-navigation" aria-label="Main navigation" [hidden]="!sideNavOpen()">
      <a
        routerLink="/quote"
        [class.active]="activeNavigation() === 'quote'"
        [attr.aria-current]="activeNavigation() === 'quote' ? 'page' : null"
        (click)="setActiveNavigation('quote')"
      >
        Quote
      </a>
      <a
        routerLink="/dashboard"
        [class.active]="activeNavigation() === 'dashboard'"
        [attr.aria-current]="activeNavigation() === 'dashboard' ? 'page' : null"
        (click)="setActiveNavigation('dashboard')"
      >
        Dashboard
      </a>
    </nav>
  `,
})
export class SideNavComponent implements OnDestroy {
  private readonly router = inject(Router);
  readonly sideNavOpen = signal(true);
  readonly activeNavigation = signal('quote');
  private readonly destroy$ = new Subject<void>();

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntil(this.destroy$),
      )
      .subscribe((event) => {
        const route = event.urlAfterRedirects.split('/')[1];
        this.activeNavigation.set(route === 'dashboard' ? 'dashboard' : 'quote');
      });

    const initialRoute = this.router.url.split('/')[1];
    this.activeNavigation.set(initialRoute === 'dashboard' ? 'dashboard' : 'quote');
  }

  setActiveNavigation(route: 'quote' | 'dashboard'): void {
    this.activeNavigation.set(route);
  }

  toggleSideNav(): void {
    this.sideNavOpen.update((isOpen) => !isOpen);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
