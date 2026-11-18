import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { BrnPopoverImports } from '@spartan-ng/brain/popover';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { Info } from './info/info';
import { lucideBadgeInfo, lucideMail, lucidePhone } from '@ng-icons/lucide';
import { ContactService } from '../../../services/contact-service/contact-service';

@Component({
  selector: 'app-about-me',
  imports: [HlmButtonImports, NgIcon, HlmAvatarImports, BrnPopoverImports, Info, NgOptimizedImage],
  templateUrl: './about-me.html',
  styleUrl: './about-me.css',
  providers: [provideIcons({ lucideMail, lucidePhone, lucideBadgeInfo })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutMe {
  protected myContact = inject(ContactService);
}
