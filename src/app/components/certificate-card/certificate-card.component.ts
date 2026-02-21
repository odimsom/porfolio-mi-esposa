import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import type CertificateAndCourse from '../../core/entities/CertificatesAndCources';

@Component({
    selector: 'app-certificate-card',
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './certificate-card.component.html',
    styleUrls: ['./certificate-card.component.css']
})
export class CertificateCardComponent {
    cert = input.required<CertificateAndCourse>();
    isAdmin = input<boolean>(false);
    edit = output<void>();
    delete = output<void>();
}
