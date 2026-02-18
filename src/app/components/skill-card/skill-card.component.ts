import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import type Skill from '../../core/entities/Skils';

@Component({
    selector: 'app-skill-card',
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="skill-card glass-card">
            <div class="skill-card__header">
                <span class="skill-card__name">{{ skill().Title }}</span>
                <span class="chip chip--accent">{{ skill().Type }}</span>
            </div>
            <p class="skill-card__desc">{{ skill().Descriptions }}</p>

            <!-- Hover tooltip with certificates -->
            <div class="skill-card__tooltip">
                <div class="tooltip__arrow"></div>
                <div class="tooltip__content glass-card">
                    <span class="tooltip__heading">Certificados relacionados</span>
                    @for (cert of skill().Hover; track $index) {
                        @if (cert) {
                            <div class="tooltip__cert">
                                <span class="tooltip__cert-title">{{ cert.Title }}</span>
                                <span class="tooltip__cert-uni">{{ cert.University }}</span>
                                <span class="tooltip__cert-date">
                                    {{ cert.Start }} — {{ cert.End || 'Presente' }}
                                </span>
                                <span class="chip"
                                    [class.chip--success]="cert.states === 'current'"
                                    [class.chip--warning]="cert.states === 'past'">
                                    @if (cert.states === 'current') {
                                        <span class="status-dot-inline status-dot-inline--active"></span>
                                        En curso
                                    } @else {
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                            <polyline points="20 6 9 17 4 12"/>
                                        </svg>
                                        Completado
                                    }
                                </span>
                            </div>
                        }
                    }
                </div>
            </div>

            @if (isAdmin()) {
                <div class="skill-actions">
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
        .skill-card {
            padding: 0.85rem 1rem;
            position: relative;
            cursor: default;
        }

        .skill-card:hover .skill-actions {
            opacity: 1;
        }

        .skill-actions {
            position: absolute;
            top: 4px;
            right: 4px;
            display: flex;
            gap: 2px;
            opacity: 0;
            transition: opacity 0.2s;
            z-index: 10;
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

        .skill-card__header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.5rem;
            margin-bottom: 0.35rem;
        }

        .skill-card__name {
            font-family: 'Architects Daughter', cursive;
            font-size: 1.15rem;
            color: #f3f4f6;
            letter-spacing: 0.05em;
            text-shadow: 0px 2px 6px rgba(0, 0, 0, 0.6);
        }

        .skill-card__desc {
            margin: 0;
            font-size: 0.75rem;
            color: #d1d5db;
            line-height: 1.6;
            letter-spacing: 0.05em;
            text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.4);
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        /* Status dot inline */
        .status-dot-inline {
            display: inline-block;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: currentColor;
        }
        
        .status-dot-inline--active {
            animation: blink 2s infinite;
        }

        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
        }

        /* Tooltip */
        .skill-card__tooltip {
            position: absolute;
            top: 0;
            right: calc(100% + 12px);
            width: 280px;
            z-index: 50;
            opacity: 0;
            pointer-events: none;
            transform: translateX(8px);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .skill-card:hover .skill-card__tooltip {
            opacity: 1;
            pointer-events: auto;
            transform: translateX(0);
        }

        .tooltip__arrow {
            position: absolute;
            top: 16px;
            right: -6px;
            width: 12px;
            height: 12px;
            background: rgba(255, 255, 255, 0.15);
            border-right: 1px solid rgba(255, 255, 255, 0.2);
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            transform: rotate(-45deg);
            backdrop-filter: blur(15px);
        }

        .tooltip__content {
            padding: 1rem !important;
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }

        .tooltip__heading {
            font-size: 0.7rem;
            font-weight: 600;
            color: #9ca3af;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .tooltip__cert {
            display: flex;
            flex-direction: column;
            gap: 0.2rem;
            padding-bottom: 0.6rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .tooltip__cert:last-child {
            padding-bottom: 0;
            border-bottom: none;
        }

        .tooltip__cert-title {
            font-size: 0.85rem;
            font-weight: 600;
            color: #f3f4f6;
        }

        .tooltip__cert-uni {
            font-size: 0.75rem;
            color: #d1d5db;
        }

        .tooltip__cert-date {
            font-size: 0.75rem;
            color: #9ca3af;
        }

        .tooltip__cert .chip {
            display: inline-flex;
            align-items: center;
            gap: 0.3rem;
            align-self: flex-start;
            margin-top: 0.2rem;
        }
    `]
})
export class SkillCardComponent {
    skill = input.required<Skill>();
    isAdmin = input<boolean>(false);
    edit = output<void>();
    delete = output<void>();
}
