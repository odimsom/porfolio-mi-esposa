import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { GenericCardComponent } from '../../components/generic-card/generic-card.component';
import { AddButtonComponent } from '../../components/add-button/add-button.component';

@Component({
    selector: 'app-portfolio',
    standalone: true,
    imports: [CommonModule, GenericCardComponent, AddButtonComponent],
    templateUrl: './portfolio.page.html',
    styleUrl: './portfolio.page.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioPage {
    private authService = inject(AuthService);
    
    isAdmin = computed(() => this.authService.isAuthenticated());
    
    // Section data (will be filled from API later)
    section1Items = signal<any[]>([]);
    section3Items = signal<any[]>([]);
    section4Items = signal<any[]>([]);
    section5Items = signal<any[]>([]);
    
    onAdd(section: string): void {
        console.log('Add item to section:', section);
        // TODO: Open modal to add item
    }
    
    onEdit(section: string, item: any): void {
        console.log('Edit item:', section, item);
        // TODO: Open modal to edit item
    }
    
    onDelete(section: string, item: any): void {
        console.log('Delete item:', section, item);
        // TODO: Confirm and delete
    }

    logout(): void {
        this.authService.logout();
    }
}
