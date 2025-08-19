import { Component } from '@angular/core';

@Component({
    selector: 'app-contact',
    standalone: true,
    template: `
    <div class="contact-container">
      <h1>{{ title }}</h1>
      <p>Email: {{ email }}</p>
    </div>
  `,
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
    title = 'Contactez-nous';
    email = 'contact@candid-nara.com';
} 