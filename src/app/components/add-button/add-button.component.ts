import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-add-button',
    standalone: true,
    templateUrl: './add-button.component.html',
    styleUrl: './add-button.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddButtonComponent {}
