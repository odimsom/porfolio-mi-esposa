
import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-admin-actions',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="admin-toolbar">
         @if (showBlog()) { <button class="add-btn" (click)="create.emit('blog')">+ Blog</button> }
         @if (showProject()) { <button class="add-btn" (click)="create.emit('project')">+ Project</button> }
         @if (showExperience()) { <button class="add-btn" (click)="create.emit('experience')">+ Exp</button> }
         @if (showStudies()) { <button class="add-btn" (click)="create.emit('studies')">+ Edu</button> }
         @if (showSkills()) { <button class="add-btn" (click)="create.emit('skill')">+ Skill</button> }
         @if (showCertificates()) { <button class="add-btn" (click)="create.emit('certificate')">+ Cert</button> }
    </div>
  `,
  styles: [`
    .admin-toolbar {
        display: flex;
        justify-content: center; /* Center buttons */
        gap: 0.8rem;
        padding: 0.5rem;
        margin-bottom: 1rem;
        position: relative;
        z-index: 10;
    }
    .add-btn {
        background: rgba(116, 185, 255, 0.15);
        border: 1px solid rgba(116, 185, 255, 0.3);
        color: #74b9ff;
        padding: 0.6rem 1.5rem;
        border-radius: 50px;
        font-family: 'Outfit', sans-serif;
        font-weight: 600;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        box-shadow: 0 4px 15px rgba(116, 185, 255, 0.1);
        backdrop-filter: blur(5px);
    }
    .add-btn:hover {
        background: rgba(116, 185, 255, 0.25);
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(116, 185, 255, 0.25);
        border-color: rgba(116, 185, 255, 0.5);
        color: white;
    }
    .add-btn:active {
        transform: translateY(0);
    }
  `]
})
export class AdminActionsComponent {
  private router = inject(Router);
  create = output<string>();

  // Observable of current URL
  private url$ = this.router.events.pipe(
    filter(e => e instanceof NavigationEnd),
    map(e => (e as NavigationEnd).urlAfterRedirects),
    startWith(this.router.url)
  );

  private currentUrl = toSignal(this.url$, { initialValue: this.router.url });

  // Route Logic
  showBlog = () => this.checkRoute('blogs');
  showProject = () => this.checkRoute('projects');
  showExperience = () => this.checkRoute('experience');
  showStudies = () => this.checkRoute('studies');
  showSkills = () => this.checkRoute('skills');
  showCertificates = () => this.checkRoute('certificates');

  private checkRoute(segment: string): boolean {
    const url = this.currentUrl().toLowerCase();
    // "/admin/todos" shows EVERYTHING
    // Strict Context: ONLY show if specific segment matches
    // Removed "Todos/Overview" check so buttons don't appear in dashboard view
    if (url.includes('/admin/todos') || url === '/admin') return false;
    
    // Specific match
    return url.includes(`/admin/${segment}`);
  }
}
