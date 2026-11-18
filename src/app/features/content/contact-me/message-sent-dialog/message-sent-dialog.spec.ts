import { OverlayContainer } from '@angular/cdk/overlay';
import { TestBed } from '@angular/core/testing';
import { MessageSentDialog } from './message-sent-dialog';

describe('MessageSentDialog', () => {
  it('opens with an accessible message and closes when the button is clicked', async () => {
    await TestBed.configureTestingModule({ imports: [MessageSentDialog] }).compileComponents();
    const fixture = TestBed.createComponent(MessageSentDialog);
    const closed = vi.fn();
    fixture.componentInstance.closed.subscribe(closed);
    fixture.detectChanges();

    const overlay = TestBed.inject(OverlayContainer).getContainerElement();
    expect(overlay.querySelector('[role="dialog"]')).toBeNull();

    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const dialog = overlay.querySelector<HTMLElement>('[role="dialog"]');
    expect(dialog).not.toBeNull();
    expect(dialog?.getAttribute('aria-labelledby')).toBe('message-sent-title');
    expect(dialog?.getAttribute('aria-describedby')).toBe('message-sent-description');
    expect(dialog?.textContent).toContain('Message sent');

    const button = dialog?.querySelector<HTMLButtonElement>('button');
    expect(button).not.toBeNull();
    button!.click();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(closed).toHaveBeenCalledOnce();
    expect(overlay.querySelector('[role="dialog"]')).toBeNull();
  });

  it('closes on Escape and can be opened again', async () => {
    await TestBed.configureTestingModule({ imports: [MessageSentDialog] }).compileComponents();
    const fixture = TestBed.createComponent(MessageSentDialog);
    const closed = vi.fn(() => fixture.componentRef.setInput('open', false));
    fixture.componentInstance.closed.subscribe(closed);
    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();
    await fixture.whenStable();

    const overlay = TestBed.inject(OverlayContainer).getContainerElement();
    const dialog = overlay.querySelector<HTMLElement>('[role="dialog"]');
    expect(dialog).not.toBeNull();
    dialog!.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    await fixture.whenStable();
    fixture.detectChanges();
    expect(closed).toHaveBeenCalledOnce();
    expect(overlay.querySelector('[role="dialog"]')).toBeNull();

    fixture.componentRef.setInput('open', true);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(overlay.querySelector('[role="dialog"]')).not.toBeNull();
  });
});
