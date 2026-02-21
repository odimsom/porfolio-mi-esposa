import { ChangeDetectionStrategy, Component, inject, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';

@Component({
    selector: 'app-contact-form',
    standalone: true,
    imports: [CommonModule, FormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.css']
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
