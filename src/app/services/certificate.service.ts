import { Injectable } from '@angular/core';
import { GenericRepository } from '../repository/GenericRepository';
import CertificateAndCourse from '../core/entities/CertificatesAndCources';

@Injectable({ providedIn: 'root' })
export class CertificateService extends GenericRepository<CertificateAndCourse> {
    override endpoint = 'certificates';
}
