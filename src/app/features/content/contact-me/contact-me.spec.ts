import { TestBed } from '@angular/core/testing';
import { ContactMe } from './contact-me';
import { MailService } from '../../../services/mail-service/mail-service';

describe('ContactMe validation', () => {
  it('shows invalid fields only after submission and clears them on reset', async () => {
    await TestBed.configureTestingModule({ imports: [ContactMe] }).compileComponents();
    const fixture = TestBed.createComponent(ContactMe);
    fixture.detectChanges();

    const email = fixture.nativeElement.querySelector('#form-email') as HTMLInputElement;
    email.dispatchEvent(new Event('blur'));
    fixture.detectChanges();
    expect(email.getAttribute('data-matches-spartan-invalid')).toBeNull();

    const form = fixture.nativeElement.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await fixture.whenStable();
    fixture.detectChanges();
    expect(email.getAttribute('data-matches-spartan-invalid')).toBe('true');

    fixture.componentInstance.reset();
    fixture.detectChanges();
    expect(email.getAttribute('data-matches-spartan-invalid')).toBeNull();
  });
});

describe('ContactMe submission', () => {
  function fillField(root: HTMLElement, selector: string, value: string) {
    const input = root.querySelector<HTMLInputElement | HTMLTextAreaElement>(selector);
    if (!input) throw new Error(`Missing form field: ${selector}`);
    input.value = value;
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }

  it('sends valid fields to the mail service and resets after success', async () => {
    const sendEmail = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });
    await TestBed.configureTestingModule({
      imports: [ContactMe],
      providers: [{ provide: MailService, useValue: { sendEmail } }],
    }).compileComponents();
    const fixture = TestBed.createComponent(ContactMe);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    fillField(root, '#form-name', 'Alex');
    fillField(root, '#form-email', 'alex@example.com');
    fillField(root, '#form-budget', '5000');
    fillField(root, '#form-message', 'Please build a website.');
    fixture.detectChanges();

    root.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await fixture.whenStable();
    fixture.detectChanges();

    expect(sendEmail).toHaveBeenCalledOnce();
    const payload = sendEmail.mock.calls[0][0] as FormData;
    expect(payload.get('name')).toBe('Alex');
    expect(payload.get('email')).toBe('alex@example.com');
    expect(payload.get('budget')).toBe('5000');
    expect(payload.get('message')).toBe('Please build a website.');
    expect(payload.has('preferred_completion_date')).toBe(false);
    expect(root.textContent).toContain('Your message has been sent.');
    expect(root.querySelector<HTMLInputElement>('#form-name')!.value).toBe('');
  });

  it('preserves form values and shows an error when sending fails', async () => {
    const sendEmail = vi.fn().mockRejectedValue(new Error('Network error'));
    await TestBed.configureTestingModule({
      imports: [ContactMe],
      providers: [{ provide: MailService, useValue: { sendEmail } }],
    }).compileComponents();
    const fixture = TestBed.createComponent(ContactMe);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    fillField(root, '#form-name', 'Alex');
    fillField(root, '#form-email', 'alex@example.com');
    fillField(root, '#form-message', 'Please build a website.');
    fixture.detectChanges();

    root.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await fixture.whenStable();
    fixture.detectChanges();

    expect(sendEmail).toHaveBeenCalledOnce();
    expect(root.textContent).toContain('Your message couldn’t be sent.');
    expect(root.querySelector<HTMLInputElement>('#form-name')!.value).toBe('Alex');
  });

  it('does not report success when the service response says submission failed', async () => {
    const sendEmail = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: false }),
    });
    await TestBed.configureTestingModule({
      imports: [ContactMe],
      providers: [{ provide: MailService, useValue: { sendEmail } }],
    }).compileComponents();
    const fixture = TestBed.createComponent(ContactMe);
    fixture.detectChanges();
    const root = fixture.nativeElement as HTMLElement;
    fillField(root, '#form-name', 'Alex');
    fillField(root, '#form-email', 'alex@example.com');
    fillField(root, '#form-message', 'Please build a website.');
    fixture.detectChanges();

    root.querySelector('form')!.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await fixture.whenStable();
    fixture.detectChanges();

    expect(root.textContent).toContain('Your message couldn’t be sent.');
    expect(root.querySelector<HTMLInputElement>('#form-name')!.value).toBe('Alex');
  });
});
