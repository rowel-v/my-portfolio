import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMoon, lucideSun } from '@ng-icons/lucide';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-header',
  imports: [HlmAvatarImports, HlmButtonImports, NgIcon],
  templateUrl: './header.html',
  styles: ``,
  providers: [provideIcons({ lucideSun, lucideMoon })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  protected currentTheme = signal<'WHITE' | 'DARK'>('DARK');

  protected toggleTheme(): void {
    this.currentTheme.set(this.currentTheme() === 'WHITE' ? 'DARK' : 'WHITE');

    document.documentElement.classList.toggle('dark', this.currentTheme() === 'DARK');
  }
}
