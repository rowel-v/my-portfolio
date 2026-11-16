import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowUpRight } from '@ng-icons/lucide';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-my-project',
  imports: [NgOptimizedImage, HlmButtonImports, NgIcon],
  templateUrl: './my-project.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideIcons({ lucideArrowUpRight })],
})
export class MyProject {}
