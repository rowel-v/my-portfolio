import { ChangeDetectionStrategy, Component, inject, Injectable, signal } from '@angular/core';
import { HeaderLabel } from '../../../shared/header-label/header-label';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDatePickerImports } from '@spartan-ng/helm/date-picker';
import { email, form, FormField, FormRoot, required } from '@angular/forms/signals';
import { AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@spartan-ng/brain/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideSendHorizontal } from '@ng-icons/lucide';

@Injectable()
class SubmitOnlyErrorStateMatcher extends ErrorStateMatcher {
  readonly submitted = signal(false);

  override isInvalid(control: AbstractControl | null): boolean {
    return this.submitted() && !!control?.invalid;
  }
}

@Component({
  selector: 'app-contact-me',
  imports: [
    HeaderLabel,
    HlmInputImports,
    HlmFieldImports,
    HlmButtonImports,
    HlmDatePickerImports,
    FormRoot,
    FormField,
    NgIcon,
  ],
  providers: [
    SubmitOnlyErrorStateMatcher,
    { provide: ErrorStateMatcher, useExisting: SubmitOnlyErrorStateMatcher },
    provideIcons({ lucideSendHorizontal }),
  ],
  templateUrl: './contact-me.html',
  styleUrl: './contact-me.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactMe {
  private readonly errorStateMatcher = inject(SubmitOnlyErrorStateMatcher);
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
          console.log(this.model());
        },
      },
    },
  );

  public reset() {
    this.errorStateMatcher.submitted.set(false);
    this.form().reset({
      name: '',
      email: '',
      budget: '',
      preferredCompletionDate: null,
      message: '',
    });
  }

  protected showValidationErrors() {
    this.errorStateMatcher.submitted.set(true);
  }

  protected refreshMinimumCompletionDate() {
    this.minimumCompletionDate.set(new Date());
  }
}
