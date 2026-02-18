import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export type FeedFilter = 'all' | 'blogs' | 'experience' | 'studies' | 'projects';

@Component({
    selector: 'app-nav-bar',
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="nav-bar">
            <!-- Logo -->
            <span class="logo-text">Portfolio</span>

            <!-- Filter Pills -->
            <div class="filter-pills">
                <!-- All -->
                <!-- All (Hidden in Admin Mode) -->
                @if (!isAdmin()) {
                    <button class="pill"
                        [class.pill--active]="activeFilter() === 'all'"
                        (click)="selectFilter('all')">
                        <svg class="pill__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                        </svg>
                        <span class="pill__label">Todos</span>
                    </button>
                }

                <!-- Blogs -->
                <button class="pill"
                    [class.pill--active]="activeFilter() === 'blogs'"
                    (click)="selectFilter('blogs')">
                    <svg class="pill__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
                    </svg>
                    <span class="pill__label">Blogs</span>
                </button>

                <!-- Experience -->
                <button class="pill"
                    [class.pill--active]="activeFilter() === 'experience'"
                    (click)="selectFilter('experience')">
                    <svg class="pill__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                    </svg>
                    <span class="pill__label">Experiencia</span>
                </button>

                <!-- Studies -->
                <button class="pill"
                    [class.pill--active]="activeFilter() === 'studies'"
                    (click)="selectFilter('studies')">
                    <svg class="pill__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5"/>
                    </svg>
                    <span class="pill__label">Estudios</span>
                </button>

                <!-- Projects -->
                <button class="pill"
                    [class.pill--active]="activeFilter() === 'projects'"
                    (click)="selectFilter('projects')">
                    <svg class="pill__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                    </svg>
                    <span class="pill__label">Proyectos</span>
                </button>

                <!-- Divider -->
                <span class="pill-divider"></span>

                <!-- Contacto -->
                <button class="pill pill--contact"
                    (click)="contactClick.emit()">
                    <svg class="pill__icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    <span class="pill__label">Contacto</span>
                </button>
            </div>

            <!-- Search -->
            <div class="search-wrapper glass-card">
                <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                    type="text"
                    class="search-input"
                    placeholder="Buscar por tags, labels..."
                    [value]="searchValue()"
                    (input)="onSearch($event)"
                />
                @if (searchValue()) {
                    <button class="search-clear" (click)="clearSearch()">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                }
            </div>
        </div>
    `,
    styles: [`
        .nav-bar {
            display: flex;
            align-items: center;
            gap: 1rem;
            height: 100%;
            padding: 0 1.25rem;
        }

        .logo-text {
            font-family: var(--font-heading);
            font-size: var(--font-size-lg);
            color: var(--color-text-primary);
            letter-spacing: 0.08em;
            white-space: nowrap;
            background: var(--gradient-secondary);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        /* Divider */
        .logo-text::after {
            content: '';
            display: inline-block;
            width: 1px;
            height: 24px;
            background: rgba(255, 255, 255, 0.15);
            margin-left: 1rem;
            vertical-align: middle;
        }

        /* Filter Pills */
        .filter-pills {
            display: flex;
            gap: 0.4rem;
        }

        .pill {
            display: flex;
            align-items: center;
            gap: 0.35rem;
            padding: 0.4rem 0.85rem;
            border-radius: 12px;
            border: 1px solid transparent;
            background: transparent;
            color: var(--color-text-muted);
            font-size: var(--font-size-sm);
            cursor: pointer;
            transition: all 0.25s ease;
            white-space: nowrap;
            position: relative;
        }

        .pill:hover {
            color: var(--color-text-primary);
            background: rgba(255, 255, 255, 0.04);
        }

        .pill--active {
            color: var(--color-accent-primary);
            background: rgba(116, 185, 255, 0.08);
            border-color: rgba(116, 185, 255, 0.2);
        }

        .pill--active::after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 20%;
            right: 20%;
            height: 2px;
            background: var(--color-accent-primary);
            border-radius: 2px;
            box-shadow: 0 0 8px rgba(116, 185, 255, 0.4);
        }

        .pill-divider {
            width: 1px;
            height: 20px;
            background: rgba(255, 255, 255, 0.12);
            align-self: center;
        }

        .pill--contact {
            border-color: rgba(116, 185, 255, 0.25);
            color: var(--color-accent-primary);
        }

        .pill--contact:hover {
            background: rgba(116, 185, 255, 0.15);
            box-shadow: 0 0 12px rgba(116, 185, 255, 0.1);
        }

        .pill__icon {
            flex-shrink: 0;
        }

        /* Search */
        .search-wrapper {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-left: auto;
            padding: 0.35rem 0.85rem !important;
            border-radius: 14px !important;
            min-width: 200px;
            max-width: 280px;
        }

        .search-icon {
            flex-shrink: 0;
            color: var(--color-text-muted);
        }

        .search-input {
            flex: 1;
            background: transparent;
            border: none;
            outline: none;
            color: var(--color-text-primary);
            font-size: var(--font-size-sm);
            font-family: var(--font-primary);
        }

        .search-input::placeholder {
            color: var(--color-text-muted);
        }

        .search-clear {
            background: none;
            border: none;
            color: var(--color-text-muted);
            cursor: pointer;
            padding: 0.2rem;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        }

        .search-clear:hover {
            color: var(--color-text-primary);
            background: rgba(255, 255, 255, 0.1);
        }
    `]
})
export class NavBarComponent {
    isAdmin = input(false);

    filterChange = output<FeedFilter>();
    searchChange = output<string>();
    contactClick = output<void>();

    activeFilter = signal<FeedFilter>('all');
    searchValue = signal('');

    selectFilter(filter: FeedFilter): void {
        this.activeFilter.set(filter);
        this.filterChange.emit(filter);
    }

    onSearch(event: Event): void {
        const value = (event.target as HTMLInputElement).value;
        this.searchValue.set(value);
        this.searchChange.emit(value);
    }

    clearSearch(): void {
        this.searchValue.set('');
        this.searchChange.emit('');
    }
}
