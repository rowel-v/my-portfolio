import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowUpRight } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HeaderLabel } from '../../../shared/header-label/header-label';

@Component({
  selector: 'app-my-project',
  imports: [NgOptimizedImage, HlmButtonImports, NgIcon, HeaderLabel],
  templateUrl: './my-project.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideIcons({ lucideArrowUpRight })],
})
export class MyProject {}
