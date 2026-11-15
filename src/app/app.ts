import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router'
import { Header } from './features/header/header';
import { Content } from './features/content/content';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Content],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
