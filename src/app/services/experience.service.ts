import { Injectable } from '@angular/core';
import { GenericRepository } from '../repository/GenericRepository';
import Experience from '../core/entities/Experience';

@Injectable({ providedIn: 'root' })
export class ExperienceService extends GenericRepository<Experience> {
    override endpoint = 'experience';
}
