import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MangaModalData {
    title: string;
    text: string;
    imageSrc?: string;
    pieceType?: string;
    moveDescription?: string;
}

@Component({
    selector: 'app-manga-modal',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="manga-modal-overlay" 
         [class.show]="isVisible" 
         (click)="onOverlayClick($event)">
      
      <!-- Page de manga qui se tourne -->
      <div class="manga-page-container" 
           [class.turning]="isTurning"
           [class.closing]="isClosing">
        
        <!-- Page avant (visible initialement) -->
        <div class="manga-page front-page">
          <div class="page-content">
            
            <!-- En-tête manga -->
            <div class="manga-header">
              <div class="header-decoration">
                <span class="decoration-line"></span>
                <span class="title-kanji">戦</span>
                <span class="decoration-line"></span>
              </div>
              <h2 class="modal-title">{{ data.title }}</h2>
            </div>

            <!-- Contenu principal -->
            <div class="manga-content-area">
              
              <!-- Image si fournie -->
              <div class="manga-image-panel" *ngIf="data.imageSrc">
                <div class="image-frame">
                  <img [src]="data.imageSrc" [alt]="data.title" class="manga-image">
                  <div class="frame-effects">
                    <div class="speed-lines"></div>
                    <div class="impact-effects"></div>
                  </div>
                </div>
              </div>

              <!-- Bulle de dialogue manga -->
              <div class="speech-bubble">
                <div class="bubble-content">
                  <p class="manga-text">{{ data.text }}</p>
                  <div class="piece-info" *ngIf="data.pieceType">
                    <span class="piece-kanji">{{ data.pieceType }}</span>
                    <span class="move-desc">{{ data.moveDescription }}</span>
                  </div>
                </div>
                <div class="bubble-tail"></div>
              </div>

              <!-- Effets visuels manga -->
              <div class="manga-effects">
                <div class="action-lines"></div>
                <div class="focus-lines"></div>
                <div class="energy-aura"></div>
              </div>
            </div>

            <!-- Bouton de fermeture stylé manga -->
            <button class="close-button manga-style" 
                    (click)="closeModal()"
                    [attr.aria-label]="'Fermer'">
              <span class="close-kanji">閉</span>
              <span class="close-text">FERMER</span>
            </button>
          </div>

          <!-- Bordures et décorations de page -->
          <div class="page-borders">
            <div class="border-decoration top"></div>
            <div class="border-decoration bottom"></div>
            <div class="border-decoration left"></div>
            <div class="border-decoration right"></div>
          </div>
        </div>

        <!-- Ombre de la page -->
        <div class="page-shadow"></div>
      </div>
    </div>
  `,
    styleUrls: ['./manga-modal.component.scss']
})
export class MangaModalComponent implements OnInit, OnDestroy {
    @Input() isVisible: boolean = false;
    @Input() data: MangaModalData = {
        title: 'Mouvement Tactique',
        text: 'Une stratégie brillante du Clan Nara !',
        pieceType: '王',
        moveDescription: 'Le Roi avance dans l\'ombre...'
    };

    @Output() closeEvent = new EventEmitter<void>();

    isTurning: boolean = false;
    isClosing: boolean = false;

    ngOnInit() {
        // Plus besoin de logique d'animation complexe
    }

    ngOnDestroy() {
        // Cleanup si nécessaire
    }

    closeModal() {
        this.isClosing = true;

        setTimeout(() => {
            this.closeEvent.emit();
            this.isClosing = false;
        }, 400); // Durée de l'animation de fermeture
    }

    onOverlayClick(event: MouseEvent) {
        if (event.target === event.currentTarget) {
            this.closeModal();
        }
    }
} 