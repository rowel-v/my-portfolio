import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Content } from './features/content/content';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Content],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
