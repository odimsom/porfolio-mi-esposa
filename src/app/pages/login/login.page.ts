import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
        <div class="login-container">
            <!-- Animated Background -->
            <div class="bg-shape shape-1"></div>
            <div class="bg-shape shape-2"></div>

            <div class="login-card glass-panel">
                <div class="header">
                    <h1>Bienvenida</h1>
                    <p class="subtitle">Acceso Administrativo</p>
                </div>

                <form (ngSubmit)="onSubmit()">
                    <div class="input-group">
                        <label>Email</label>
                        <input 
                            type="email" 
                            [(ngModel)]="email" 
                            name="email" 
                            placeholder="tucorreo@ejemplo.com"
                            [disabled]="loading()"
                            required
                        >
                    </div>

                    <div class="input-group">
                        <label>Contraseña</label>
                        <input 
                            type="password" 
                            [(ngModel)]="password" 
                            name="password" 
                            placeholder="••••••••"
                            [disabled]="loading()"
                            required
                        >
                    </div>

                    @if (error()) {
                        <div class="error-msg fade-in">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                            {{ error() }}
                        </div>
                    }

                    <button type="submit" class="cta-btn" [disabled]="loading()">
                        @if (loading()) {
                            <span class="spinner"></span> Procesando...
                        } @else {
                            Ingresar
                        }
                    </button>
                    
                    <button type="button" class="back-link" (click)="goBack()">
                        ← Volver al Portafolio
                    </button>
                </form>
            </div>
        </div>
    `,
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
