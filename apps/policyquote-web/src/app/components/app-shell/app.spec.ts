import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { appRoutes } from '../../config/app.routes';
import { describe, expect, it, beforeEach } from '@jest/globals';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(appRoutes)],
    }).compileComponents();
  });

  it('should render the routed application outlet', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });

  it('should configure the landing page as the default and preserve quote routing', () => {
    expect(appRoutes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: '', pathMatch: 'full', redirectTo: 'home' }),
        expect.objectContaining({ path: 'quote', loadComponent: expect.any(Function) }),
        expect.objectContaining({ path: 'home', loadComponent: expect.any(Function) })
      ]),
    );
  });
});
