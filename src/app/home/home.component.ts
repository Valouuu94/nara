import { Component } from '@angular/core';

@Component({
    selector: 'app-home',
    standalone: true,
    template: `
    <div class="nara-clan-container">
      <!-- Section héro avec logo du clan Nara -->
      <section class="hero-section">
        <div class="shadow-overlay"></div>
        <div class="hero-content">
          <div class="clan-logo">
            <div class="logo-container">
              <img src="assets/Nara_Symbol.png" alt="Symbole du Clan Nara" class="nara-symbol">
              <div class="logo-glow"></div>
            </div>
          </div>
          <h1 class="clan-title">Clan Nara</h1>
          <p class="clan-motto">"L'ombre suit la lumière, la sagesse suit l'ombre"</p>
          <div class="shikamaru-quote">
            <p>"Quel ennui... Mais c'est mon devoir de protéger le village."</p>
            <span class="quote-author">- Shikamaru Nara</span>
          </div>
        </div>
        <div class="floating-shadows">
          <div class="shadow-orb" *ngFor="let shadow of shadowOrbs; let i = index" 
               [style.animation-delay]="shadow.delay"
               [style.left]="shadow.left"
               [style.top]="shadow.top"></div>
        </div>
      </section>

      <!-- Section photo avec cadre -->
      <section class="photo-section">
        <div class="photo-container">
          <div class="photo-frame">
            <div class="frame-border">
              <div class="frame-corner top-left"></div>
              <div class="frame-corner top-right"></div>
              <div class="frame-corner bottom-left"></div>
              <div class="frame-corner bottom-right"></div>
            </div>
            <div class="photo-placeholder">
              <div class="photo-icon">📷</div>
              <p>Votre photo ici</p>
              <small>Cliquez pour ajouter une image</small>
            </div>
          </div>
          <div class="photo-description">
            <h3>Mémoire du Clan</h3>
            <p>Capturez un moment spécial de votre histoire avec le clan Nara</p>
          </div>
        </div>
      </section>

      <!-- Section histoire -->
      <section class="story-section">
        <h2 class="section-title">L'Histoire du Clan</h2>
        <div class="story-container">
          <div class="story-content">
            <h3>La Légende des Nara</h3>
            <p>Dans les temps anciens, au cœur de la forêt sacrée de Konoha, vivait un clan mystérieux dont la sagesse était aussi profonde que les ombres qu'ils manipulaient. Les Nara, gardiens des secrets ancestraux, maîtrisaient l'art de contrôler les ténèbres pour protéger la lumière.</p>
            
            <p>Leur symbole, un cerf majestueux aux bois dorés, représentait la grâce et l'intelligence qui caractérisaient chaque membre du clan. De génération en génération, ils transmirent leur savoir, leurs techniques d'ombres et leur philosophie unique.</p>
            
            <p>Aujourd'hui, le clan Nara continue de briller dans l'obscurité, prouvant que même dans les moments les plus sombres, la sagesse et la stratégie peuvent triompher. Chaque ombre qu'ils manipulent raconte une histoire, chaque technique qu'ils maîtrisent honore leurs ancêtres.</p>
          </div>
          <div class="story-decoration">
            <div class="shadow-scroll">
              <div class="scroll-content">
                <span>🦌</span>
                <span>🌑</span>
                <span>⚡</span>
                <span>🧠</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Section des techniques d'ombres -->
      <section class="shadow-techniques">
        <h2 class="section-title">Techniques du Clan Nara</h2>
        <div class="techniques-grid">
          <div class="technique-card" *ngFor="let technique of shadowTechniques">
            <div class="technique-icon">{{ technique.icon }}</div>
            <h3 class="technique-name">{{ technique.name }}</h3>
            <p class="technique-description">{{ technique.description }}</p>
            <div class="shadow-effect"></div>
          </div>
        </div>
      </section>

      <!-- Section des caractéristiques du clan -->
      <section class="clan-features">
        <h2 class="section-title">Héritage du Clan</h2>
        <div class="features-grid">
          <div class="feature-card" *ngFor="let feature of clanFeatures">
            <div class="feature-icon">{{ feature.icon }}</div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-description">{{ feature.description }}</p>
          </div>
        </div>
      </section>

      <!-- Section CTA -->
      <section class="cta-section">
        <h2>Prêt à rejoindre le clan ?</h2>
        <p>Découvrez la puissance des ombres et la sagesse des Nara</p>
        <button class="nara-button" (click)="enterClan()">
          <span class="button-shadow"></span>
          Entrer dans l'ombre
        </button>
      </section>
    </div>
  `,
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    shadowOrbs = [
        { delay: '0s', left: '10%', top: '20%' },
        { delay: '2s', left: '80%', top: '30%' },
        { delay: '4s', left: '20%', top: '70%' },
        { delay: '6s', left: '70%', top: '80%' }
    ];

    shadowTechniques = [
        {
            icon: '🌑',
            name: 'Kagemane no Jutsu',
            description: 'Contrôle des ombres pour manipuler les ennemis'
        },
        {
            icon: '⚫',
            name: 'Kage Nui',
            description: 'Projectiles d\'ombres pour attaquer à distance'
        },
        {
            icon: '🕳️',
            name: 'Kage Kubishibari',
            description: 'Étranglement par les ombres'
        },
        {
            icon: '🌙',
            name: 'Kage Yose',
            description: 'Attraction des ombres pour capturer'
        }
    ];

    clanFeatures = [
        {
            icon: '🧠',
            title: 'Intelligence Exceptionnelle',
            description: 'IQ de 200+, stratégies complexes et planification'
        },
        {
            icon: '🦌',
            title: 'Symbole du Cerf',
            description: 'Représente la sagesse et la grâce du clan'
        },
        {
            icon: '🌿',
            title: 'Médecine Traditionnelle',
            description: 'Connaissance des herbes et remèdes ancestraux'
        }
    ];

    enterClan() {
        console.log('Bienvenue dans le clan Nara !');
        // Ici vous pourriez ajouter une navigation ou une animation
    }
} 