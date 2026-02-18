import { Injectable } from '@angular/core';
import { GenericRepository } from '../repository/GenericRepository';
import Project from '../core/entities/Projects';

@Injectable({ providedIn: 'root' })
export class ProjectService extends GenericRepository<Project> {
    override endpoint = 'projects';
}
