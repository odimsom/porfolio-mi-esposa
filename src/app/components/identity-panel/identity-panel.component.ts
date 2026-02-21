import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import type Experience from '../../core/entities/Experience';
import type Studies from '../../core/entities/Studies';
import type Person from '../../core/entities/Person';

@Component({
    selector: 'app-identity-panel',
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './identity-panel.component.html',
    styleUrl: './identity-panel.component.css'
})
export class IdentityPanelComponent {
    currentExperience = input<Experience | null>(null);
    currentStudy = input<Studies | null>(null);
    location = input<string>('Guayaquil, Ecuador');
    person = input<Person | null>(null);
    isAdmin = input<boolean>(false);
    contactClick = output<void>();
    editProfile = output<void>();
}
