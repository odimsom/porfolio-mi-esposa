import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export type FeedFilter = 'all' | 'blogs' | 'experience' | 'studies' | 'projects';

@Component({
    selector: 'app-nav-bar',
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './nav-bar.component.html',
    styleUrl: './nav-bar.component.css'
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
