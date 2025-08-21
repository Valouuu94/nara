import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ShogiPiece {
    type: string;
    color: 'white' | 'black';
    position: { row: number; col: number };
    kanji: string;
    canMove: boolean;
}

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="manga-page-container">
      <!-- En-tête manga avec titre stylisé -->
      <header class="manga-header">
        <div class="title-container">
          <h1 class="manga-title">L'ÉVEIL DES OMBRES</h1>
          <div class="title-decoration">
            <span class="decoration-line"></span>
            <span class="decoration-symbol">🌑</span>
            <span class="decoration-line"></span>
          </div>
          <h2 class="manga-subtitle">CLAN NARA - LA SAGESSE DANS LES TÉNÈBRES</h2>
        </div>
      </header>

      <!-- Section principale avec layout manga -->
      <main class="manga-content">
        <!-- Panneau gauche - Logo et présentation -->
        <div class="manga-panel left-panel">
          <div class="clan-logo-section">
            <div class="logo-container">
              <img src="assets/Nara_Symbol.png" alt="Symbole du Clan Nara" class="nara-symbol-manga">
              <div class="logo-aura"></div>
            </div>
            <div class="clan-intro">
              <h3 class="panel-title">Le Clan Nara</h3>
              <p class="manga-text">Gardiens des ombres ancestrales, maîtres de la stratégie et de la sagesse. Leur pouvoir réside dans la manipulation des ténèbres pour protéger la lumière.</p>
            </div>
          </div>
        </div>

        <!-- Panneau central - Échiquier Shogi -->
        <div class="manga-panel center-panel">
          <div class="shogi-section">
            <h3 class="panel-title">Stratégie du Clan</h3>
            <div class="shogi-board-container">
              <div class="shogi-board">
                <div class="board-grid">
                  <div class="board-row" *ngFor="let row of boardRows; let rowIndex = index">
                    <div class="board-cell" 
                         *ngFor="let col of boardCols; let colIndex = index"
                         [class.highlighted]="isHighlighted(rowIndex, colIndex)"
                         [class.valid-move]="isValidMove(rowIndex, colIndex)"
                         [class.drag-over]="isDragOver(rowIndex, colIndex)"
                         (click)="onCellClick(rowIndex, colIndex)"
                         (dragover)="onDragOver($event, rowIndex, colIndex)"
                         (dragleave)="onDragLeave($event)"
                         (drop)="onDrop($event, rowIndex, colIndex)">
                      
                      <!-- Pièce de Shogi -->
                      <div class="shogi-piece" 
                           *ngIf="getPieceAt(rowIndex, colIndex)"
                           [class.selected]="isSelected(rowIndex, colIndex)"
                           [class.white-piece]="getPieceAt(rowIndex, colIndex)?.color === 'white'"
                           [class.black-piece]="getPieceAt(rowIndex, colIndex)?.color === 'black'"
                           [class.dragging]="isDragging(rowIndex, colIndex)"
                           [draggable]="getPieceAt(rowIndex, colIndex)?.color === 'white'"
                           (dragstart)="onDragStart($event, rowIndex, colIndex)"
                           (dragend)="onDragEnd($event)"
                           (click)="onPieceClick(rowIndex, colIndex, $event)">
                        <span class="piece-kanji">{{ getPieceAt(rowIndex, colIndex)?.kanji }}</span>
                      </div>
                      
                      <!-- Points de promotion -->
                      <div class="promotion-dot" 
                           *ngIf="isPromotionZone(rowIndex, colIndex)"></div>
                    </div>
                  </div>
                </div>
                
                <!-- Légende des pièces -->
                <div class="piece-legend">
                  <h4>Pièces du Clan</h4>
                  <div class="legend-items">
                    <div class="legend-item" *ngFor="let piece of pieceTypes">
                      <span class="legend-kanji">{{ piece.kanji }}</span>
                      <span class="legend-name">{{ piece.name }}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Instructions -->
              <div class="shogi-instructions">
                <p><strong>Instructions :</strong></p>
                <p>• Glissez-déposez une pièce blanche pour la déplacer</p>
                <p>• Ou cliquez sur une pièce puis sur une case vide</p>
                <p>• Mouvement limité à 1 case maximum</p>
                <p>• Seules les pièces blanches peuvent bouger</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Panneau droit - Photo et histoire -->
        <div class="manga-panel right-panel">
          <div class="photo-story-section">
            <!-- Cadre photo style manga -->
            <div class="manga-photo-frame">
              <div class="frame-border-manga">
                <div class="corner-decoration top-left"></div>
                <div class="corner-decoration top-right"></div>
                <div class="corner-decoration bottom-left"></div>
                <div class="corner-decoration bottom-right"></div>
              </div>
              <div class="photo-content">
                <div class="camera-icon">📷</div>
                <p class="photo-text">Votre moment avec le clan</p>
                <small class="photo-hint">Cliquez pour immortaliser</small>
              </div>
            </div>
            
            <!-- Histoire du clan -->
            <div class="clan-story">
              <h4 class="story-title">La Légende</h4>
              <p class="story-text">Dans les temps anciens, au cœur de la forêt sacrée de Konoha, vivait un clan mystérieux dont la sagesse était aussi profonde que les ombres qu'ils manipulaient...</p>
            </div>
          </div>
        </div>
      </main>

      <!-- Section basse avec caractéristiques -->
      <section class="manga-bottom-section">
        <div class="features-grid">
          <div class="feature-item" *ngFor="let feature of clanFeatures">
            <div class="feature-icon">{{ feature.icon }}</div>
            <h4 class="feature-title">{{ feature.title }}</h4>
            <p class="feature-desc">{{ feature.description }}</p>
          </div>
        </div>
      </section>

      <!-- Call to action style manga -->
      <footer class="manga-footer">
        <div class="cta-container">
          <h3 class="cta-title">Prêt à rejoindre le clan ?</h3>
          <button class="manga-button" (click)="enterClan()">
            <span class="button-text">ENTRER DANS L'OMBRE</span>
            <div class="button-effect"></div>
          </button>
        </div>
      </footer>
    </div>
  `,
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    // Configuration de l'échiquier Shogi
    boardRows = Array.from({ length: 9 }, (_, i) => i);
    boardCols = Array.from({ length: 9 }, (_, i) => i);

    selectedPiece: { row: number; col: number } | null = null;
    draggedPiece: { row: number; col: number } | null = null;
    dragOverCell: { row: number; col: number } | null = null;

    // Types de pièces avec leurs kanji
    pieceTypes = [
        { kanji: '王', name: 'Roi' },
        { kanji: '金', name: 'Général d\'Or' },
        { kanji: '銀', name: 'Général d\'Argent' },
        { kanji: '桂', name: 'Cavalier' },
        { kanji: '香', name: 'Lance' },
        { kanji: '飛', name: 'Tour' },
        { kanji: '角', name: 'Fou' },
        { kanji: '步', name: 'Pion' }
    ];

    // Pièces sur l'échiquier (position initiale comme sur votre image)
    shogiPieces: ShogiPiece[] = [
        // Pièces blanches (en bas) - couleur claire
        { type: '香', color: 'white', position: { row: 8, col: 0 }, kanji: '香', canMove: true },
        { type: '桂', color: 'white', position: { row: 8, col: 1 }, kanji: '桂', canMove: true },
        { type: '銀', color: 'white', position: { row: 8, col: 2 }, kanji: '銀', canMove: true },
        { type: '金', color: 'white', position: { row: 8, col: 3 }, kanji: '金', canMove: true },
        { type: '王', color: 'white', position: { row: 8, col: 4 }, kanji: '王', canMove: true },
        { type: '金', color: 'white', position: { row: 8, col: 5 }, kanji: '金', canMove: true },
        { type: '銀', color: 'white', position: { row: 8, col: 6 }, kanji: '銀', canMove: true },
        { type: '桂', color: 'white', position: { row: 8, col: 7 }, kanji: '桂', canMove: true },
        { type: '香', color: 'white', position: { row: 8, col: 8 }, kanji: '香', canMove: true },
        { type: '角', color: 'white', position: { row: 7, col: 1 }, kanji: '角', canMove: true },
        { type: '飛', color: 'white', position: { row: 7, col: 7 }, kanji: '飛', canMove: true },
        { type: '步', color: 'white', position: { row: 6, col: 0 }, kanji: '步', canMove: true },
        { type: '步', color: 'white', position: { row: 6, col: 1 }, kanji: '步', canMove: true },
        { type: '步', color: 'white', position: { row: 6, col: 2 }, kanji: '步', canMove: true },
        { type: '步', color: 'white', position: { row: 6, col: 3 }, kanji: '步', canMove: true },
        { type: '步', color: 'white', position: { row: 6, col: 4 }, kanji: '步', canMove: true },
        { type: '步', color: 'white', position: { row: 6, col: 5 }, kanji: '步', canMove: true },
        { type: '步', color: 'white', position: { row: 6, col: 6 }, kanji: '步', canMove: true },
        { type: '步', color: 'white', position: { row: 6, col: 7 }, kanji: '步', canMove: true },
        { type: '步', color: 'white', position: { row: 6, col: 8 }, kanji: '步', canMove: true },

        // Pièces noires (en haut) - couleur foncée
        { type: '香', color: 'black', position: { row: 0, col: 0 }, kanji: '香', canMove: false },
        { type: '桂', color: 'black', position: { row: 0, col: 1 }, kanji: '桂', canMove: false },
        { type: '銀', color: 'black', position: { row: 0, col: 2 }, kanji: '銀', canMove: false },
        { type: '金', color: 'black', position: { row: 0, col: 3 }, kanji: '金', canMove: false },
        { type: '王', color: 'black', position: { row: 0, col: 4 }, kanji: '王', canMove: false },
        { type: '金', color: 'black', position: { row: 0, col: 5 }, kanji: '金', canMove: false },
        { type: '銀', color: 'black', position: { row: 0, col: 6 }, kanji: '銀', canMove: false },
        { type: '桂', color: 'black', position: { row: 0, col: 7 }, kanji: '桂', canMove: false },
        { type: '香', color: 'black', position: { row: 0, col: 8 }, kanji: '香', canMove: false },
        { type: '角', color: 'black', position: { row: 1, col: 7 }, kanji: '角', canMove: false },
        { type: '飛', color: 'black', position: { row: 1, col: 1 }, kanji: '飛', canMove: false },
        { type: '步', color: 'black', position: { row: 2, col: 0 }, kanji: '步', canMove: false },
        { type: '步', color: 'black', position: { row: 2, col: 1 }, kanji: '步', canMove: false },
        { type: '步', color: 'black', position: { row: 2, col: 2 }, kanji: '步', canMove: false },
        { type: '步', color: 'black', position: { row: 2, col: 3 }, kanji: '步', canMove: false },
        { type: '步', color: 'black', position: { row: 2, col: 4 }, kanji: '步', canMove: false },
        { type: '步', color: 'black', position: { row: 2, col: 5 }, kanji: '步', canMove: false },
        { type: '步', color: 'black', position: { row: 2, col: 6 }, kanji: '步', canMove: false },
        { type: '步', color: 'black', position: { row: 2, col: 7 }, kanji: '步', canMove: false },
        { type: '步', color: 'black', position: { row: 2, col: 8 }, kanji: '步', canMove: false }
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

    // Méthodes pour l'échiquier Shogi
    getPieceAt(row: number, col: number): ShogiPiece | undefined {
        return this.shogiPieces.find(piece =>
            piece.position.row === row && piece.position.col === col
        );
    }

    isSelected(row: number, col: number): boolean {
        return this.selectedPiece?.row === row && this.selectedPiece?.col === col;
    }

    isHighlighted(row: number, col: number): boolean {
        return this.selectedPiece?.row === row && this.selectedPiece?.col === col;
    }

    isDragging(row: number, col: number): boolean {
        return this.draggedPiece?.row === row && this.draggedPiece?.col === col;
    }

    isDragOver(row: number, col: number): boolean {
        return this.dragOverCell?.row === row && this.dragOverCell?.col === col;
    }

    isValidMove(row: number, col: number): boolean {
        if (!this.selectedPiece && !this.draggedPiece) return false;

        const sourcePos = this.selectedPiece || this.draggedPiece;
        if (!sourcePos) return false;

        const piece = this.getPieceAt(sourcePos.row, sourcePos.col);
        if (!piece || piece.color !== 'white') return false;

        // Vérifier si la case de destination est vide
        if (this.getPieceAt(row, col)) return false;

        // Vérifier si le mouvement est d'une seule case
        const rowDiff = Math.abs(row - sourcePos.row);
        const colDiff = Math.abs(col - sourcePos.col);

        // Mouvement d'une seule case (horizontale, verticale ou diagonale)
        return (rowDiff === 1 && colDiff === 0) ||
            (rowDiff === 0 && colDiff === 1) ||
            (rowDiff === 1 && colDiff === 1);
    }

    isPromotionZone(row: number, col: number): boolean {
        // Zones de promotion : 3 premières et 3 dernières rangées
        return row <= 2 || row >= 6;
    }

    // Gestion du glisser-déposer
    onDragStart(event: DragEvent, row: number, col: number): void {
        const piece = this.getPieceAt(row, col);
        if (piece && piece.color === 'white') {
            this.draggedPiece = { row, col };
            this.selectedPiece = null;

            // Créer une image de drag personnalisée
            if (event.dataTransfer) {
                event.dataTransfer.effectAllowed = 'move';
                event.dataTransfer.setData('text/plain', `${row},${col}`);
            }
        } else {
            event.preventDefault();
        }
    }

    onDragOver(event: DragEvent, row: number, col: number): void {
        if (this.isValidMove(row, col)) {
            event.preventDefault();
            event.dataTransfer!.dropEffect = 'move';
            this.dragOverCell = { row, col };
        }
    }

    onDragLeave(event: DragEvent): void {
        this.dragOverCell = null;
    }

    onDrop(event: DragEvent, row: number, col: number): void {
        event.preventDefault();

        if (this.draggedPiece && this.isValidMove(row, col)) {
            const piece = this.getPieceAt(this.draggedPiece.row, this.draggedPiece.col);
            if (piece) {
                piece.position = { row, col };
            }
        }

        this.draggedPiece = null;
        this.dragOverCell = null;
    }

    onDragEnd(event: DragEvent): void {
        this.draggedPiece = null;
        this.dragOverCell = null;
    }

    // Gestion des clics (méthode alternative)
    onPieceClick(row: number, col: number, event: Event): void {
        event.stopPropagation();
        const piece = this.getPieceAt(row, col);

        if (piece && piece.color === 'white') {
            this.selectedPiece = { row, col };
        }
    }

    onCellClick(row: number, col: number): void {
        if (this.selectedPiece && this.isValidMove(row, col)) {
            // Déplacer la pièce
            const piece = this.getPieceAt(this.selectedPiece.row, this.selectedPiece.col);
            if (piece) {
                piece.position = { row, col };
                this.selectedPiece = null;
            }
        } else if (!this.getPieceAt(row, col)) {
            // Désélectionner si on clique sur une case vide
            this.selectedPiece = null;
        }
    }

    enterClan() {
        console.log('Bienvenue dans le clan Nara !');
    }
} 