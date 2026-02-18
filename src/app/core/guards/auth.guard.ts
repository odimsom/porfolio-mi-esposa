import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const loginUnlockedGuard: CanActivateFn = (route) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // Check if key is in query params
    const key = route.queryParamMap.get('key');
    if (key) {
        if (authService.unlockLogin(key)) {
            return true;
        }
    }

    // Check if already unlocked in session
    if (authService.checkLoginUnlocked()) {
        return true;
    }

    // Redirect to portfolio if not unlocked
    router.navigate(['/']);
    return false;
};

export const authGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isAuthenticated()) {
        return true;
    }

    router.navigate(['/']);
    return false;
};
