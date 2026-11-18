import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { BrnDialogImports, type BrnDialogState } from '@spartan-ng/brain/dialog';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCircleCheck } from '@ng-icons/lucide';

@Component({
  selector: 'app-message-sent-dialog',
  imports: [BrnDialogImports, HlmButtonImports, NgIcon],
  providers: [provideIcons({ lucideCircleCheck })],
  templateUrl: './message-sent-dialog.html',
  styleUrl: './message-sent-dialog.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageSentDialog {
  readonly open = input(false);
  readonly closed = output<void>();

  protected onStateChanged(state: BrnDialogState) {
    if (state === 'closed') this.closed.emit();
  }
}
