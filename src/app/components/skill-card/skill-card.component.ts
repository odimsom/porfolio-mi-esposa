import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import type Skill from '../../core/entities/Skils';

@Component({
    selector: 'app-skill-card',
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './skill-card.component.html',
    styleUrls: ['./skill-card.component.css']
})
export class SkillCardComponent {           
    skill = input.required<Skill>();
    isAdmin = input<boolean>(false);
    edit = output<void>();
    delete = output<void>();
}
