import { afterNextRender, ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowUp } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-back-to-top',
  imports: [HlmButtonImports, NgIcon],
  providers: [provideIcons({ lucideArrowUp })],
  templateUrl: './back-to-top.html',
  styleUrl: './back-to-top.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(window:scroll)': 'onScroll()' },
})
export class BackToTop {
  protected showButton = signal(false);

  constructor() {
    afterNextRender(() => this.onScroll());
  }

  protected onScroll(): void {
    this.showButton.set(window.scrollY > 200);
  }
}
