import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export type MobileSection = 'experience' | 'studies' | 'profile' | 'projects' | 'blogs';

@Component({
  selector: 'app-mobile-nav',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mobile-nav.html',
  styleUrl: './mobile-nav.css'
})
export class MobileNavComponent {
  sectionChange = output<MobileSection>();
  activeSection = signal<MobileSection>('profile');

  selectSection(section: MobileSection): void {
    this.activeSection.set(section);
    this.sectionChange.emit(section);
  }
}
