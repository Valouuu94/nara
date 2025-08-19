import { Component } from '@angular/core';

@Component({
    selector: 'app-about',
    standalone: true,
    template: `
    <div class="about-container">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
    </div>
  `,
    styleUrls: ['./about.component.scss']
})
export class AboutComponent {
    title = 'À propos de Candid Nara';
    description = 'Une application Angular moderne et performante';
} 