import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppHeaderComponent } from './app-header.component';
import { describe, expect, it, beforeEach } from '@jest/globals';

describe('AppHeaderComponent', () => {
  let fixture: ComponentFixture<AppHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppHeaderComponent);
    fixture.detectChanges();
  });

  it('renders the PolicyQuote brand link pointing to the home route', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('[data-testid="brand-link"]');

    expect(link?.textContent?.trim()).toBe('PolicyQuote');
    expect(link?.getAttribute('href')).toBe('/');
  });
});
