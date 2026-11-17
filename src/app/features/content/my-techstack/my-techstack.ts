import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeaderLabel } from '../../../shared/header-label/header-label';
import { TechStack } from '../../../shared/tech-stack/tech-stack';

@Component({
  selector: 'app-my-techstack',
  imports: [HeaderLabel, TechStack],
  templateUrl: './my-techstack.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyTechstack {}
