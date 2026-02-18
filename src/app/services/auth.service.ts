import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

interface LoginResponse {
    success: boolean;
    apiKey?: string;
    user?: { email: string };
    error?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);
    
    isAuthenticated = signal(false);
    isLoginUnlocked = signal(false);
    currentUser = signal<string | null>(null);

    constructor() {
        this.checkStoredAuth();
    }

    private checkStoredAuth(): void {
        const apiKey = localStorage.getItem('apiKey');
        const user = localStorage.getItem('userEmail');
        if (apiKey && user) {
            this.isAuthenticated.set(true);
            this.currentUser.set(user);
        }
    }

    unlockLogin(key: string): boolean {
        if (key === environment.loginSecretKey) {
            this.isLoginUnlocked.set(true);
            sessionStorage.setItem('loginUnlocked', 'true');
            return true;
        }
        return false;
    }

    checkLoginUnlocked(): boolean {
        const unlocked = sessionStorage.getItem('loginUnlocked') === 'true';
        this.isLoginUnlocked.set(unlocked);
        return unlocked;
    }

    async login(email: string, password: string): Promise<boolean> {
        try {
            const response = await this.http.post<LoginResponse>(
                `${environment.apiUrl}/auth/login`,
                { email, password }
            ).toPromise();

            if (response?.success && response.apiKey) {
                localStorage.setItem('apiKey', response.apiKey);
                localStorage.setItem('userEmail', response.user?.email || email);
                this.isAuthenticated.set(true);
                this.currentUser.set(response.user?.email || email);
                return true;
            }
            return false;
        } catch {
            return false;
        }
    }

    logout(): void {
        localStorage.removeItem('apiKey');
        localStorage.removeItem('userEmail');
        sessionStorage.removeItem('loginUnlocked');
        this.isAuthenticated.set(false);
        this.isLoginUnlocked.set(false);
        this.currentUser.set(null);
        this.router.navigate(['/']);
    }

    getApiKey(): string | null {
        return localStorage.getItem('apiKey');
    }
}
