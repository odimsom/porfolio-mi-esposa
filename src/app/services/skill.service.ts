import { Injectable } from '@angular/core';
import { GenericRepository } from '../repository/GenericRepository';
import Skill from '../core/entities/Skils';

@Injectable({ providedIn: 'root' })
export class SkillService extends GenericRepository<Skill> {
    override endpoint = 'skills';
}
