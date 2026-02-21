import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-generic-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './generic-card.component.html',
    styleUrls: ['./generic-card.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericCardComponent {
    data = input.required<any>();
    showControls = input(false);
    
    edit = output<void>();
    delete = output<void>();
}
