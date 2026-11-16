import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  selector: 'app-info',
  imports: [HlmButtonImports],
  templateUrl: './info.html',
  styleUrl: './info.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Info {
  
}
