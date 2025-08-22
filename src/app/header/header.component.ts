import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [RouterLink, CommonModule],
    template: `
    <header class="nara-header">
      <div class="header-container">
        <div class="logo">
          <div class="clan-symbol">🦌</div>
          <h1>{{ appTitle }}</h1>
        </div>
        
        <nav class="main-nav">
          <ul class="nav-list">
            <li class="nav-item" *ngFor="let item of navItems">
              <a [routerLink]="item.route" class="nav-link" routerLinkActive="active">
                <span class="nav-icon">{{ item.icon }}</span>
                {{ item.label }}
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div class="header-shadow"></div>
    </header>
  `,
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    appTitle = 'Clan Nara';
    navItems = [
        { label: 'Accueil', route: '/home', icon: '🏠' },
        { label: 'Techniques', route: '/about', icon: '🌑' },
        { label: 'Contact', route: '/contact', icon: '📧' }
    ];
} 