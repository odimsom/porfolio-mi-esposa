import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  selector: 'app-floating-actions',
  standalone: true,
  templateUrl: './floating-actions.component.html',
  styleUrl: './floating-actions.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FloatingActionsComponent {
  downloadCVClick = output<void>();
  contactClick = output<void>();
}
