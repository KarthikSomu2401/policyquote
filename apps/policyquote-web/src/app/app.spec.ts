import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';
import { appRoutes } from './app.routes';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(appRoutes)],
    }).compileComponents();
  });

  it('should render the application layout', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-header')).not.toBeNull();
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
    expect(compiled.querySelector('app-footer')).not.toBeNull();
  });

  it('should configure quote, dashboard, and the root redirect routes', () => {
    expect(appRoutes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: 'quote' }),
        expect.objectContaining({ path: 'dashboard' }),
        expect.objectContaining({ path: '', redirectTo: 'quote' }),
      ]),
    );
  });
});
