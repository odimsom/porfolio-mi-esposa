import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './contact.page.html',
    styleUrl: './contact.page.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactPage {
    private contactService = inject(ContactService);
    private router = inject(Router);
    
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
            next: (response) => {
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
    
    goBack(): void {
        this.router.navigate(['/']);
    }
}
