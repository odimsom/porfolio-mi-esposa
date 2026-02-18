import { ChangeDetectionStrategy, Component, inject, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';

@Component({
    selector: 'app-contact-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <div class="contact-wrapper fade-in">
            <div class="contact-card glass-card">
                <!-- Header -->
                <div class="contact-header">
                    <button class="back-btn" (click)="backClick.emit()">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
                        </svg>
                        Volver
                    </button>
                    <h2 class="contact-title">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                        </svg>
                        Contacto
                    </h2>
                    <p class="contact-subtitle">¿Tienes un proyecto en mente? ¡Hablemos!</p>
                </div>

                @if (success()) {
                    <div class="success-box fade-in">
                        <div class="success-icon">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                <polyline points="22 4 12 14.01 9 11.01"/>
                            </svg>
                        </div>
                        <h3>¡Mensaje enviado!</h3>
                        <p>Gracias por contactarme. Te responderé lo antes posible.</p>
                        <button class="btn-secondary" (click)="success.set(false)">
                            Enviar otro mensaje
                        </button>
                    </div>
                } @else {
                    <form (ngSubmit)="onSubmit()" class="contact-form">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="cf-name">Nombre</label>
                                <input type="text" id="cf-name"
                                    [ngModel]="name()" (ngModelChange)="name.set($event)"
                                    name="name" placeholder="Tu nombre" />
                            </div>
                            <div class="form-group">
                                <label for="cf-email">Email</label>
                                <input type="email" id="cf-email"
                                    [ngModel]="email()" (ngModelChange)="email.set($event)"
                                    name="email" placeholder="tu@email.com" />
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="cf-subject">Asunto</label>
                            <input type="text" id="cf-subject"
                                [ngModel]="subject()" (ngModelChange)="subject.set($event)"
                                name="subject" placeholder="¿De qué quieres hablar?" />
                        </div>

                        <div class="form-group">
                            <label for="cf-message">Mensaje</label>
                            <textarea id="cf-message"
                                [ngModel]="message()" (ngModelChange)="message.set($event)"
                                name="message" placeholder="Cuéntame sobre tu proyecto..."
                                rows="4"></textarea>
                        </div>

                        @if (error()) {
                            <div class="error-msg">{{ error() }}</div>
                        }

                        <button type="submit" class="btn-submit" [disabled]="loading()">
                            @if (loading()) {
                                <span class="spinner"></span> Enviando...
                            } @else {
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                                </svg>
                                Enviar Mensaje
                            }
                        </button>
                    </form>
                }
            </div>
        </div>
    `,
    styles: [`
        .contact-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            padding: 1.5rem;
        }

        .contact-card {
            width: 100%;
            max-width: 560px;
            padding: 2rem !important;
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
        }

        /* Header */
        .contact-header {
            display: flex;
            flex-direction: column;
            gap: 0.3rem;
        }

        .back-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.4rem;
            background: none;
            border: none;
            color: var(--color-text-muted);
            font-size: var(--font-size-xs);
            font-family: var(--font-primary);
            cursor: pointer;
            padding: 0;
            margin-bottom: 0.5rem;
            transition: color 0.2s ease;
            align-self: flex-start;
        }

        .back-btn:hover {
            color: var(--color-accent-primary);
        }

        .contact-title {
            display: flex;
            align-items: center;
            gap: 0.6rem;
            font-family: var(--font-heading);
            font-size: var(--font-size-2xl) !important;
            color: var(--color-text-primary);
            margin: 0;
            letter-spacing: 0.05em;
            text-shadow: 0px 2px 6px rgba(0, 0, 0, 0.6);
        }

        .contact-title svg {
            color: var(--color-accent-primary);
        }

        .contact-subtitle {
            font-size: var(--font-size-sm);
            color: var(--color-text-secondary);
            margin: 0;
            text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.4);
        }

        /* Form */
        .contact-form {
            display: flex;
            flex-direction: column;
            gap: 0.85rem;
        }

        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.85rem;
        }

        .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.3rem;
        }

        .form-group label {
            font-size: var(--font-size-xs);
            font-weight: var(--font-weight-medium);
            color: var(--color-text-secondary);
            text-transform: uppercase;
            letter-spacing: var(--letter-spacing-wider);
        }

        .form-group input,
        .form-group textarea {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 0.65rem 0.85rem;
            color: var(--color-text-primary);
            font-family: var(--font-primary);
            font-size: var(--font-size-sm);
            letter-spacing: 0.05em;
            transition: all 0.25s ease;
            outline: none;
        }

        .form-group input:focus,
        .form-group textarea:focus {
            border-color: rgba(116, 185, 255, 0.5);
            box-shadow: 0 0 12px rgba(116, 185, 255, 0.15);
            background: rgba(255, 255, 255, 0.1);
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
            color: var(--color-text-muted);
        }

        .form-group textarea {
            resize: vertical;
            min-height: 80px;
        }

        /* Error */
        .error-msg {
            font-size: var(--font-size-xs);
            color: var(--color-error);
            padding: 0.5rem 0.75rem;
            background: rgba(255, 118, 117, 0.12);
            border: 1px solid rgba(255, 118, 117, 0.25);
            border-radius: 10px;
        }

        /* Submit Button */
        .btn-submit {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            width: 100%;
            padding: 0.75rem;
            background: rgba(116, 185, 255, 0.1);
            border: 1px solid rgba(116, 185, 255, 0.3);
            border-radius: 14px;
            color: var(--color-accent-primary);
            font-family: var(--font-heading);
            font-size: var(--font-size-base);
            letter-spacing: 0.05em;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .btn-submit:hover:not(:disabled) {
            background: rgba(116, 185, 255, 0.25);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(116, 185, 255, 0.2);
        }

        .btn-submit:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        /* Spinner */
        .spinner {
            width: 14px;
            height: 14px;
            border: 2px solid rgba(116, 185, 255, 0.3);
            border-top-color: var(--color-accent-primary);
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
            to { transform: rotate(360deg); }
        }

        /* Success */
        .success-box {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.75rem;
            text-align: center;
            padding: 1.5rem 0;
        }

        .success-icon {
            color: var(--color-accent-tertiary);
        }

        .success-box h3 {
            font-family: var(--font-heading);
            font-size: var(--font-size-xl) !important;
            color: var(--color-text-primary);
            margin: 0;
            letter-spacing: 0.05em;
        }

        .success-box p {
            font-size: var(--font-size-sm);
            color: var(--color-text-secondary);
            margin: 0;
        }

        .btn-secondary {
            margin-top: 0.5rem;
            padding: 0.5rem 1.25rem;
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 12px;
            color: var(--color-text-secondary);
            font-family: var(--font-primary);
            font-size: var(--font-size-sm);
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .btn-secondary:hover {
            background: rgba(255, 255, 255, 0.12);
            color: var(--color-text-primary);
        }

        /* Fade-in animation */
        .fade-in {
            animation: fadeIn 0.4s ease-out;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `]
})
export class ContactFormComponent {
    private contactService = inject(ContactService);

    backClick = output<void>();

    name = signal('');
    email = signal('');
    subject = signal('');
    message = signal('');
    error = signal('');
    success = signal(false);
    loading = signal(false);

    async onSubmit(): Promise<void> {
        if (!this.name() || !this.email() || !this.subject() || !this.message()) {
            this.error.set('Por favor completa todos los campos');
            return;
        }

        this.loading.set(true);
        this.error.set('');

        this.contactService.sendMessage({
            name: this.name(),
            email: this.email(),
            subject: this.subject(),
            message: this.message()
        }).subscribe({
            next: (response: any) => {
                this.loading.set(false);
                if (response.success) {
                    this.success.set(true);
                    this.resetForm();
                } else {
                    this.error.set(response.error || 'Error al enviar mensaje');
                }
            },
            error: () => {
                this.loading.set(false);
                this.error.set('Error de conexión. Intenta más tarde.');
            }
        });
    }

    private resetForm(): void {
        this.name.set('');
        this.email.set('');
        this.subject.set('');
        this.message.set('');
    }
}
