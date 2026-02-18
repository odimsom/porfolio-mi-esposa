import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import type Experience from '../../core/entities/Experience';
import type Studies from '../../core/entities/Studies';
import type Person from '../../core/entities/Person';

@Component({
    selector: 'app-identity-panel',
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="identity-panel">
            <!-- Edit Button (Admin Only) -->
            @if (isAdmin()) {
                <button class="edit-profile-btn" (click)="editProfile.emit()">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    Edit
                </button>
            }

            <!-- Avatar -->
            <div class="avatar-section">
                <div class="avatar-wrapper">
                    <div class="avatar">
                        <img [src]="person()?.PhotoUrl || 'https://i.ibb.co/Tx9KRQjr/fotoperfil.png'" [alt]="person()?.Name || 'Eva Nazareth'">
                    </div>
                    <div class="status-dot"></div>
                </div>
            </div>

            <!-- Name & Title -->
            <div class="info-section">
                <h1 class="name">{{ person()?.Name || 'Eva Nazareth' }}</h1>
                <p class="role">{{ person()?.Title || 'Frontend Developer' }}</p>
            </div>

            <!-- Bio -->
            <p class="bio">
                {{ person()?.Descriptions || 'Desarrolladora apasionada por crear experiencias digitales elegantes y accesibles. Amante del diseño limpio, las micro-animaciones y el código bien estructurado.' }}
            </p>

            <!-- Social Links -->
            <div class="social-links">
                @if (person()?.Github) {
                    <a [href]="person()?.Github" target="_blank" class="social-link glass-card" title="GitHub">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                        </svg>
                        <span>GitHub</span>
                    </a>
                }
                @if (person()?.Linkedin) {
                    <a [href]="person()?.Linkedin" target="_blank" class="social-link glass-card" title="LinkedIn">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                            <rect x="2" y="9" width="4" height="12"/>
                            <circle cx="4" cy="4" r="2"/>
                        </svg>
                        <span>LinkedIn</span>
                    </a>
                }
                @if (person()?.Email) {
                    <a [href]="'mailto:' + person()?.Email" class="social-link glass-card" title="Email">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                        </svg>
                        <span>Email</span>
                    </a>
                }
            </div>

            <!-- Current Status Widget: Experience -->
            @if (currentExperience()) {
                <div class="status-widget glass-card">
                    <div class="status-widget__icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                        </svg>
                    </div>
                    <div class="status-widget__content">
                        <span class="status-widget__label">Trabajando como</span>
                        <span class="status-widget__value">{{ currentExperience()!.Title }}</span>
                        <span class="status-widget__sub">en {{ currentExperience()!.Company }}</span>
                    </div>
                </div>
            }

            @if (currentStudy()) {
                <div class="status-widget glass-card">
                    <div class="status-widget__icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                            <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5"/>
                        </svg>
                    </div>
                    <div class="status-widget__content">
                        <span class="status-widget__label">Actualmente cursando</span>
                        <span class="status-widget__value">{{ currentStudy()!.Title }}</span>
                        <span class="status-widget__sub">en {{ currentStudy()!.University }}</span>
                    </div>
                </div>
            }

            <!-- Location -->
            <div class="location">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                </svg>
                <span>{{ person()?.Location || location() }}</span>
            </div>
        </div>
    `,
    styles: [`
        .identity-panel {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding: 1.75rem 1.25rem;
            height: 100%;
            position: relative;
        }

        .edit-profile-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            z-index: 20;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: #fff;
            padding: 4px 8px;
            border-radius: 6px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 0.7rem;
            transition: all 0.2s;
        }
        .edit-profile-btn:hover {
            background: rgba(255, 255, 255, 0.2);
        }

        /* Avatar section — Vertical Portrait */
        .avatar-section {
            display: flex;
            justify-content: center;
            margin-bottom: 0.5rem; /* Space for the name below */
        }

        .avatar-wrapper {
            position: relative;
            width: 100%; /* Take full width of sidebar */
        }

        .avatar {
            width: 100%;
            /* Vertical aspect ratio as requested */
            aspect-ratio: 3/4;
            border-radius: 24px;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            
            /* Linear Fade Mask */
            -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
            mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
            
            /* Subtle shadow to lift it */
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        .avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }

        .status-dot {
            position: absolute;
            bottom: 15%; /* Moved up slightly to be in the visible area */
            right: 10px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: var(--color-success);
            border: 3px solid rgba(45, 52, 54, 0.8);
            animation: pulse-dot 2s infinite;
            z-index: 10;
        }

        @keyframes pulse-dot {
            0%, 100% { box-shadow: 0 0 0 0 rgba(0, 184, 148, 0.5); }
            50% { box-shadow: 0 0 0 8px rgba(0, 184, 148, 0); }
        }

        /* Name & Role — left-aligned */
        .info-section {
            display: flex;
            flex-direction: column;
            gap: 0.15rem;
            margin-top: -1.5rem; /* slight overlap with faded image area? or just natural flow */
            position: relative;
            z-index: 5;
        }

        .name {
            font-family: var(--font-heading);
            font-size: var(--font-size-3xl) !important;
            color: var(--color-text-primary);
            margin: 0;
            text-align: left;
            letter-spacing: 0.07em;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .role {
            font-size: var(--font-size-sm);
            color: var(--color-accent-primary);
            margin: 0;
            font-weight: var(--font-weight-medium);
            letter-spacing: var(--letter-spacing-wide);
            text-align: left;
        }

        /* Bio — strictly left-aligned */
        .bio {
            font-size: var(--font-size-sm);
            color: var(--color-text-secondary);
            text-align: left;
            line-height: 1.6;
            letter-spacing: 0.07em;
            margin: 0;
            padding: 0;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }

        /* Social Links */
        .social-links {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            width: 100%;
        }

        .social-link {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.6rem 1rem !important;
            border-radius: 14px !important;
            color: var(--color-text-secondary);
            text-decoration: none;
            font-size: var(--font-size-sm);
            transition: all 0.3s ease;
        }

        .social-link:hover {
            color: var(--color-accent-primary);
            background: rgba(116, 185, 255, 0.12) !important;
        }

        .social-link svg {
            flex-shrink: 0;
        }

        /* Status Widget */
        .status-widget {
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
            padding: 0.85rem 1rem !important;
            border-radius: 16px !important;
            width: 100%;
            box-sizing: border-box;
        }

        .status-widget__icon {
            flex-shrink: 0;
            margin-top: 2px;
            color: var(--color-accent-primary);
        }

        .status-widget__content {
            display: flex;
            flex-direction: column;
            gap: 0.1rem;
            min-width: 0;
        }

        .status-widget__label {
            font-size: var(--font-size-xs);
            color: var(--color-text-muted);
            text-transform: uppercase;
            letter-spacing: var(--letter-spacing-wider);
        }

        .status-widget__value {
            font-size: var(--font-size-sm);
            color: var(--color-text-primary);
            font-weight: var(--font-weight-semibold);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .status-widget__sub {
            font-size: var(--font-size-xs);
            color: var(--color-text-secondary);
        }

        /* Location */
        .location {
            display: flex;
            align-items: center;
            gap: 0.4rem;
            font-size: var(--font-size-xs);
            color: var(--color-text-muted);
            margin-top: auto;
        }

        /* Hablemos CTA Button */
        .btn-contact {
            width: 100%;
            padding: 0.75rem;
            background: rgba(116, 185, 255, 0.1);
            border: 1px solid rgba(116, 185, 255, 0.35);
            border-radius: 14px;
            color: var(--color-accent-primary);
            font-family: var(--font-handwritten);
            font-size: var(--font-size-base);
            letter-spacing: 1px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
        }

        .btn-contact:hover {
            background: rgba(116, 185, 255, 0.2);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(116, 185, 255, 0.25);
            border-color: rgba(116, 185, 255, 0.5);
        }
    `]
})
export class IdentityPanelComponent {
    currentExperience = input<Experience | null>(null);
    currentStudy = input<Studies | null>(null);
    location = input<string>('Guayaquil, Ecuador');
    person = input<Person | null>(null);
    isAdmin = input<boolean>(false);
    
    contactClick = output<void>();
    editProfile = output<void>();
}
