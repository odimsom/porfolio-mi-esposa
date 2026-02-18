import { ChangeDetectionStrategy, Component, input, computed, signal, OnInit, OnDestroy, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import type Blog from '../../core/entities/Blogs';
import type Experience from '../../core/entities/Experience';
import type Studies from '../../core/entities/Studies';
import type Project from '../../core/entities/Projects';

export type FeedItem =
    | (Blog & { _type: 'blog' })
    | (Experience & { _type: 'experience' })
    | (Studies & { _type: 'studies' })
    | (Project & { _type: 'projects' });

@Component({
    selector: 'app-feed-card',
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <article class="feed-card glass-card">
            <!-- Image section — TOP -->
            <div class="feed-card__image" (click)="view.emit()">
                @if (allImages().length > 0) {
                    @for (img of allImages(); track img; let i = $index) {
                        <img [src]="img" [alt]="item().Title"
                            class="carousel-img"
                            [class.carousel-img--active]="i === currentImageIndex()"
                            loading="lazy" />
                    }
                } @else {
                    <div class="feed-card__placeholder" [class]="'feed-card__placeholder--' + item()._type">
                        <div class="feed-card__placeholder-icon">
                            @if (item()._type === 'experience') {
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                            } @else if (item()._type === 'studies') {
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5"/></svg>
                            } @else {
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                            }
                        </div>
                    </div>
                }

                @if (isCurrent()) {
                    <div class="feed-card__current-overlay">
                        <span class="feed-card__pulse"></span>
                        Actual
                    </div>
                }
                
                <!-- View Details Overlay -->
                <div class="view-overlay">
                    <span>Ver Detalles</span>
                </div>
            </div>

            <!-- Content section — BOTTOM -->
            <div class="feed-card__body">
                <div class="header-row">
                    <div class="feed-card__badge" [class]="'feed-card__badge--' + item()._type">
                        @if (item()._type === 'blog') {
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                        } @else if (item()._type === 'experience') {
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                        } @else if (item()._type === 'projects') {
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
                        } @else {
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5"/></svg>
                        }
                        <span>{{ badgeLabel() }}</span>
                    </div>

                    @if (isAdmin()) {
                        <div class="admin-actions">
                            <button (click)="edit.emit()" class="action-btn edit" title="Editar">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                            </button>
                            <button (click)="delete.emit()" class="action-btn delete" title="Eliminar">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                            </button>
                        </div>
                    }

                    <!-- Project Links (Repo/Demo) -->
                    @if (item()._type === 'projects') {
                        <div class="project-links">
                             @if (projectRepo()) {
                                <a [href]="projectRepo()" target="_blank" class="project-link" title="Ver Código">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                                </a>
                             }
                             @if (projectDemo()) {
                                <a [href]="projectDemo()" target="_blank" class="project-link" title="Ver Demo">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
                                </a>
                             }
                        </div>
                    }
                </div>

                <h3 class="feed-card__title">{{ item().Title }}</h3>
                <p class="feed-card__desc">{{ item().Descriptions }}</p>

                <div class="feed-card__meta">
                    @if (dateRange()) {
                        <span class="feed-card__date">
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                            {{ dateRange() }}
                        </span>
                    }
                    @if (subtitle()) {
                        <span class="feed-card__subtitle">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                            {{ subtitle() }}
                        </span>
                    }
                </div>

                <div class="feed-card__labels">
                    @for (label of labels(); track label) {
                        <span class="chip">{{ label }}</span>
                    }
                </div>
            </div>
        </article>
    `,
    styles: [`
        /* VERTICAL card layout — image TOP, content BOTTOM */
        .feed-card {
            display: flex;
            flex-direction: column;
            overflow: hidden;
            padding: 0 !important;
        }

        /* Image section — top half */
        .feed-card__image {
            position: relative;
            overflow: hidden;
            height: 140px;
            flex-shrink: 0;
            cursor: pointer;
        }

        .feed-card__image:hover .view-overlay {
            opacity: 1;
        }

        .view-overlay {
            position: absolute;
            inset: 0;
            background: rgba(0,0,0,0.4);
            backdrop-filter: blur(2px);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
            color: white;
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 0.1em;
            font-weight: bold;
        }

        .carousel-img {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            object-fit: cover;
            opacity: 0;
            transition: opacity 1.2s ease-in-out;
        }

        .carousel-img--active {
            opacity: 1;
        }

        .feed-card__image img:only-child {
            position: relative;
        }

        .feed-card__placeholder {
            width: 100%; height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .feed-card__placeholder--experience {
            background: linear-gradient(135deg, rgba(253, 203, 110, 0.15), rgba(253, 150, 80, 0.08));
        }

        .feed-card__placeholder--studies {
            background: linear-gradient(135deg, rgba(0, 184, 148, 0.15), rgba(0, 206, 209, 0.08));
        }

        .feed-card__placeholder--projects {
            background: linear-gradient(135deg, rgba(162, 155, 254, 0.15), rgba(116, 185, 255, 0.08));
        }

        .feed-card__placeholder-icon {
            color: rgba(255, 255, 255, 0.2);
        }

        .feed-card__current-overlay {
            position: absolute;
            top: 0.5rem; left: 0.5rem;
            display: inline-flex;
            align-items: center;
            gap: 0.3rem;
            font-size: 0.6rem;
            color: #00b894;
            padding: 0.15rem 0.5rem;
            border-radius: 9999px;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(8px);
            border: 1px solid rgba(0, 184, 148, 0.3);
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }

        .feed-card__pulse {
            width: 6px; height: 6px;
            border-radius: 50%;
            background: #00b894;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
        }

        /* Content section — bottom */
        .feed-card__body {
            flex: 1;
            padding: 0.85rem;
            display: flex;
            flex-direction: column;
            gap: 0.3rem;
            min-width: 0;
        }

        .header-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .admin-actions {
            display: flex;
            gap: 0.3rem;
        }

        .action-btn {
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: #d1d5db;
            width: 24px;
            height: 24px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s;
        }
        .action-btn:hover { background: rgba(255, 255, 255, 0.2); color: white; }
        .action-btn.delete:hover { background: rgba(255, 118, 117, 0.2); color: #ff7675; }

        .project-links {
            display: flex;
            gap: 0.3rem;
            margin-left: auto; /* Push to right */
        }

        .project-link {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 24px; 
            height: 24px;
            border-radius: 6px;
            color: #a29bfe;
            background: rgba(162, 155, 254, 0.1);
            transition: all 0.2s;
        }
        .project-link:hover {
            background: rgba(162, 155, 254, 0.25);
            color: #fff;
        }

        .feed-card__badge {
            display: inline-flex;
            align-items: center;
            gap: 0.25rem;
            font-size: 0.6rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
        }

        .feed-card__badge--blog { color: #74b9ff; }
        .feed-card__badge--experience { color: #fdcb6e; }
        .feed-card__badge--studies { color: #00b894; }
        .feed-card__badge--projects { color: #a29bfe; }

        .feed-card__title {
            margin: 0;
            font-family: 'Architects Daughter', cursive;
            font-size: 1.1rem !important;
            color: #f3f4f6;
            line-height: 1.3;
            letter-spacing: 0.05em;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .feed-card__desc {
            margin: 0;
            font-size: 0.75rem;
            color: #d1d5db;
            line-height: 1.6;
            letter-spacing: 0.05em;
            text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .feed-card__meta {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            flex-wrap: wrap;
        }

        .feed-card__date,
        .feed-card__subtitle {
            display: flex;
            align-items: center;
            gap: 0.2rem;
            font-size: 0.6rem;
            color: #9ca3af;
        }

        .feed-card__labels {
            display: flex;
            flex-wrap: wrap;
            gap: 0.2rem;
            margin-top: auto;
        }

        .feed-card__labels .chip {
            font-size: 0.55rem;
            padding: 0.1rem 0.4rem;
        }
    `]
})
export class FeedCardComponent implements OnInit, OnDestroy {
    item = input.required<FeedItem>();
    isAdmin = input<boolean>(false);

    edit = output<void>();
    delete = output<void>();
    view = output<void>();

    private carouselTimer: ReturnType<typeof setInterval> | null = null;
    currentImageIndex = signal(0);

    badgeLabel = computed(() => {
        const t = this.item()._type;
        if (t === 'blog') return 'Blog';
        if (t === 'experience') return 'Experiencia';
        if (t === 'studies') return 'Estudios';
        if (t === 'projects') return 'Proyecto';
        return '';
    });

    allImages = computed(() => {
        const it = this.item();
        if (it._type === 'blog') {
            return (it as Blog & { _type: 'blog' }).ImgesUrls ?? [];
        }
        return [];
    });

    dateRange = computed(() => {
        const it = this.item();
        if (it._type === 'blog') return it.Date;
        if (it._type === 'projects') return '';
        const start = (it as Experience | Studies).Start;
        const end = (it as Experience | Studies).End;
        return end ? `${start} — ${end}` : `${start} — Presente`;
    });

    subtitle = computed(() => {
        const it = this.item();
        if (it._type === 'experience') return (it as Experience & { _type: 'experience' }).Company;
        if (it._type === 'studies') return (it as Studies & { _type: 'studies' }).University;
        if (it._type === 'blog') return (it as Blog & { _type: 'blog' }).Location;
        return '';
    });

    labels = computed(() => {
        const it = this.item();
        if (it._type === 'blog') return (it as Blog & { _type: 'blog' }).Tags;
        if (it._type === 'projects') return (it as Project & { _type: 'projects' }).Labels;
        return (it as (Experience | Studies) & { _type: string }).Labels;
    });

    isCurrent = computed(() => {
        const it = this.item();
        if (it._type === 'experience') return (it as Experience & { _type: 'experience' }).states === 'current';
        if (it._type === 'studies') return (it as Studies & { _type: 'studies' }).states === 'current';
        return false;
    });

    projectRepo = computed(() => {
        const it = this.item();
        return it._type === 'projects' ? (it as Project & { _type: 'projects' }).Repository : null;
    });

    projectDemo = computed(() => {
        const it = this.item();
        return it._type === 'projects' ? (it as Project & { _type: 'projects' }).Demo : null;
    });

    ngOnInit(): void {
        const images = this.allImages();
        if (images.length > 1) {
            this.carouselTimer = setInterval(() => {
                this.currentImageIndex.update((i: number) => (i + 1) % images.length);
            }, 4000);
        }
    }

    ngOnDestroy(): void {
        if (this.carouselTimer) {
            clearInterval(this.carouselTimer);
        }
    }
}
