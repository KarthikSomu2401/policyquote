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

  it('should render the routed application outlet', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });

  it('should configure the landing page as the default and preserve quote routing', () => {
    expect(appRoutes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: '', component: expect.any(Function) }),
        expect.objectContaining({ path: 'quote' }),
      ]),
    );
  });
});
