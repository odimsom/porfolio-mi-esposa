import { Injectable } from '@angular/core';
import { GenericRepository } from '../repository/GenericRepository';
import Studies from '../core/entities/Studies';

@Injectable({ providedIn: 'root' })
export class StudiesService extends GenericRepository<Studies> {
    override endpoint = 'studies';
}
