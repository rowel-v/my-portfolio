import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMail } from '@ng-icons/lucide';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';
import { ContactService } from '../../services/contact-service/contact-service';

@Component({
  selector: 'app-footer',
  imports: [NgOptimizedImage, NgIcon, HlmAvatarImports],
  providers: [provideIcons({ lucideMail })],
  templateUrl: './footer.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  protected myContact = inject(ContactService);
  protected readonly currentYear = new Date().getFullYear();
}
