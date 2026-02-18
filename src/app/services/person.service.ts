import { Injectable } from '@angular/core';
import { GenericRepository } from '../repository/GenericRepository';
import Person from '../core/entities/Person';

@Injectable({ providedIn: 'root' })
export class PersonService extends GenericRepository<Person> {
    override endpoint = 'person';
}
