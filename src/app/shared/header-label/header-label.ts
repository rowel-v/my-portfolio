import { Component, input } from '@angular/core';

@Component({
  selector: 'app-header-label',
  imports: [],
  templateUrl: './header-label.html',
  styles: ``,
})
export class HeaderLabel {

  label = input.required<string>();
  size = input<number>(26);

}
