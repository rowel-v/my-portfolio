import { Component } from '@angular/core';

@Component({
  selector: 'app-what-i-can-build',
  imports: [],
  templateUrl: './what-i-can-build.html',
  styles: ``,
})
export class WhatICanBuild {
  protected readonly myOffers = [
    {
      id: 'landing-pages',
      title: 'Landing Pages',
      description:
        'A focused page that introduces your product or service and encourages visitors to take action.',
    },
    {
      id: 'portfolio-websites',
      title: 'Portfolio Websites',
      description: 'A personal website to showcase your work, skills, and experience.',
    },
    {
      id: 'blogs',
      title: 'Blogs',
      description:
        'A website where you can share articles, stories, or updates with your audience.',
    },
    {
      id: 'appointment-booking',
      title: 'Appointment Booking Systems',
      description:
        'A website where customers can view available times and book appointments online.',
    },
  ] as const;
}
