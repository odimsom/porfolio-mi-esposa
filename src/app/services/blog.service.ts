import { Injectable } from '@angular/core';
import { GenericRepository } from '../repository/GenericRepository';
import Blog from '../core/entities/Blogs';

@Injectable({ providedIn: 'root' })
export class BlogService extends GenericRepository<Blog> {
    override endpoint = 'blogs';
}
