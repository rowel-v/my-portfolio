import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-tech-stack',
  imports: [NgOptimizedImage],
  templateUrl: './tech-stack.html',
  styleUrl: './tech-stack.css',
})
export class TechStack {
  imageSrc = input.required<string>();
  name = input.required<string>();
}
