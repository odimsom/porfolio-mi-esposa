import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import type CertificateAndCourse from '../../core/entities/CertificatesAndCources';

@Component({
    selector: 'app-certificate-card',
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="cert-card glass-card">
            <div class="cert-card__header">
                <div class="cert-card__icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="8" r="7"/>
                        <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
                    </svg>
                </div>
                <div class="cert-card__info">
                    <h4 class="cert-card__title">{{ cert().Title }}</h4>
                    <span class="cert-card__uni">{{ cert().University }}</span>
                </div>
            </div>
            <div class="cert-card__footer">
                <span class="cert-card__date">
                    {{ cert().Start }} — {{ cert().End || 'Presente' }}
                </span>
                <span class="chip"
                    [class.chip--success]="cert().states === 'current'"
                    [class.chip--warning]="cert().states === 'past'">
                    {{ cert().states === 'current' ? 'En curso' : 'Completado' }}
                </span>
            </div>

            
            @if (isAdmin()) {
                <div class="cert-actions">
                    <button (click)="edit.emit()" class="mini-btn edit" title="Editar">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                    </button>
                    <button (click)="delete.emit()" class="mini-btn delete" title="Eliminar">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                    </button>
                </div>
            }
        </div>
    `,
    styles: [`
        .cert-card {
            padding: 0.75rem 0.85rem;
            position: relative;
        }

        .cert-card:hover .cert-actions {
            opacity: 1;
        }

        .cert-actions {
            position: absolute;
            top: 4px;
            right: 4px;
            display: flex;
            gap: 2px;
            opacity: 0;
            transition: opacity 0.2s;
        }

        .mini-btn {
            background: rgba(0,0,0,0.4);
            border: none;
            color: #d1d5db;
            width: 20px;
            height: 20px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }
        .mini-btn:hover { color: white; background: rgba(0,0,0,0.6); }
        .mini-btn.delete:hover { color: #ff7675; }

        .cert-card__header {
            display: flex;
            align-items: flex-start;
            gap: 0.6rem;
        }

        .cert-card__icon {
            flex-shrink: 0;
            margin-top: 2px;
            color: #00b894; /* Hardcoded CTA color */
        }

        .cert-card__info {
            display: flex;
            flex-direction: column;
            gap: 0.15rem;
            min-width: 0;
        }

        .cert-card__title {
            margin: 0;
            font-family: var(--font-heading);
            font-size: var(--font-size-sm);
            color: #f3f4f6; /* Hardcoded title color */
            line-height: 1.3;
            letter-spacing: 0.05em;
            text-shadow: 0px 2px 6px rgba(0, 0, 0, 0.6);
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .cert-card__uni {
            font-size: var(--font-size-xs);
            color: #d1d5db; /* Hardcoded text color */
        }

        .cert-card__footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.5rem;
            margin-top: 0.5rem;
        }

        .cert-card__date {
            font-size: var(--font-size-xs);
            color: #9ca3af; /* Hardcoded muted color */
        }
    `]
})
export class CertificateCardComponent {
    cert = input.required<CertificateAndCourse>();
    isAdmin = input<boolean>(false);
    edit = output<void>();
    delete = output<void>();
}
