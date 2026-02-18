import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login.page.html',
    styleUrl: './login.page.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPage {
    private authService = inject(AuthService);
    private router = inject(Router);
    
    email = signal('');
    password = signal('');
    error = signal('');
    loading = signal(false);
    
    async onSubmit(): Promise<void> {
        if (!this.email() || !this.password()) {
            this.error.set('Por favor completa todos los campos');
            return;
        }
        
        this.loading.set(true);
        this.error.set('');
        
        const success = await this.authService.login(this.email(), this.password());
        
        this.loading.set(false);
        
        if (success) {
            this.router.navigate(['/']);
        } else {
            this.error.set('Credenciales inválidas');
        }
    }
    
    goBack(): void {
        this.router.navigate(['/']);
    }
}
