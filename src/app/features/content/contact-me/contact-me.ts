import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  forwardRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDatePickerImports } from '@spartan-ng/helm/date-picker';
import { email, form, FormField, FormRoot, required } from '@angular/forms/signals';
import { AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@spartan-ng/brain/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMessageCircle, lucideSendHorizontal } from '@ng-icons/lucide';
import { MailService } from '../../../services/mail-service/mail-service';
import { MessageSentDialog } from './message-sent-dialog/message-sent-dialog';

@Component({
  selector: 'app-contact-me',
  imports: [
    HlmInputImports,
    HlmFieldImports,
    HlmButtonImports,
    HlmDatePickerImports,
    FormRoot,
    FormField,
    NgIcon,
    MessageSentDialog,
  ],
  providers: [
    { provide: ErrorStateMatcher, useExisting: forwardRef(() => ContactMe) },
    provideIcons({ lucideMessageCircle, lucideSendHorizontal }),
  ],
  templateUrl: './contact-me.html',
  styleUrl: './contact-me.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactMe implements ErrorStateMatcher {
  private readonly mailService = inject(MailService);
  private readonly projectIntroElement =
    viewChild.required<ElementRef<HTMLElement>>('projectIntro');
  protected readonly projectIntroText =
    'Tell me about your project, and I’ll let you know if it’s something I can help you build.';
  protected readonly typingStarted = signal(false);

  private readonly submitted = signal(false);
  protected readonly submissionStatus = signal<'idle' | 'success' | 'error'>('idle');

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') {
        this.typingStarted.set(true);
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            this.typingStarted.set(true);
            observer.disconnect();
          }
        },
        { threshold: 0.25 },
      );
      observer.observe(this.projectIntroElement().nativeElement);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  protected readonly minimumCompletionDate = signal(new Date());
  private readonly model = signal({
    name: '',
    email: '',
    budget: '',
    preferredCompletionDate: null as Date | null,
    message: '',
  });

  public readonly form = form(
    this.model,
    (schemaPath) => {
      required(schemaPath.name, { message: 'Name is required' });
      required(schemaPath.email, { message: 'Email is required' });
      email(schemaPath.email, { message: 'Enter a valid email address' });
      required(schemaPath.message, { message: 'Message is required' });
    },
    {
      submission: {
        action: async () => {
          const {
            name,
            email: emailAddress,
            budget,
            preferredCompletionDate,
            message,
          } = this.model();
          const formData = new FormData();
          formData.set('name', name);
          formData.set('email', emailAddress);
          formData.set('message', message);
          formData.set('subject', 'New portfolio inquiry');
          formData.set('from_name', 'Portfolio Contact');
          if (budget.trim()) formData.set('budget', budget);
          if (preferredCompletionDate) {
            const year = preferredCompletionDate.getFullYear();
            const month = String(preferredCompletionDate.getMonth() + 1).padStart(2, '0');
            const day = String(preferredCompletionDate.getDate()).padStart(2, '0');
            formData.set('preferred_completion_date', `${year}-${month}-${day}`);
          }

          try {
            const response = await this.mailService.sendEmail(formData);
            const result: unknown = await response.json();
            if (
              !response.ok ||
              typeof result !== 'object' ||
              result === null ||
              !('success' in result) ||
              result.success !== true
            ) {
              throw new Error('Message submission failed.');
            }
            this.reset();
            this.submissionStatus.set('success');
          } catch {
            this.submissionStatus.set('error');
          }
        },
      },
    },
  );

  public reset() {
    this.submitted.set(false);
    this.form().reset({
      name: '',
      email: '',
      budget: '',
      preferredCompletionDate: null,
      message: '',
    });
  }

  protected showValidationErrors() {
    this.submissionStatus.set('idle');
    this.submitted.set(true);
  }

  protected closeSuccessDialog() {
    this.submissionStatus.set('idle');
  }

  public isInvalid(control: AbstractControl | null): boolean {
    return this.submitted() && !!control?.invalid;
  }

  protected refreshMinimumCompletionDate() {
    this.minimumCompletionDate.set(new Date());
  }
}
