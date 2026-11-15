import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideInfo, lucideMail, lucidePhone } from '@ng-icons/lucide';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { BrnPopoverImports } from '@spartan-ng/brain/popover';
import { Info } from './info/info';

@Component({
  selector: 'app-content',
  imports: [HlmButtonImports, NgIcon, HlmAvatarImports, BrnPopoverImports, Info],
  templateUrl: './content.html',
  styleUrl: './content.css',
  providers: [provideIcons({ lucideMail, lucidePhone, lucideInfo })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Content {}
