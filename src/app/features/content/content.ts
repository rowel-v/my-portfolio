import { Component } from '@angular/core';
import { AboutMe } from './about-me/about-me';
import { WhatICanBuild } from './what-i-can-build/what-i-can-build';
import { MyProject } from './my-project/my-project';
import { MyTechstack } from './my-techstack/my-techstack';
import { ContactMe } from './contact-me/contact-me';
import { Footer } from '../footer/footer';
import { BackToTop } from './back-to-top/back-to-top';
import { ScrollReveal } from '../../shared/scroll-reveal/scroll-reveal';

@Component({
  selector: 'app-content',
  imports: [
    AboutMe,
    WhatICanBuild,
    MyProject,
    MyTechstack,
    ContactMe,
    Footer,
    BackToTop,
    ScrollReveal,
  ],
  templateUrl: './content.html',
  styleUrl: './content.css',
})
export class Content {}
