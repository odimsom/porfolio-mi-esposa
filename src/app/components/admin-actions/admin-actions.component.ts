
import { Component, computed, input, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-admin-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-actions.component.html',
  styleUrl: './admin-actions.component.css'
})
export class AdminActionsComponent {
  private router = inject(Router);
  create = output<string>();
  currentFilter = input<string | null>(null);

  // Observable of current URL
  private url$ = this.router.events.pipe(
    filter((e: any) => e instanceof NavigationEnd),
    map((e: any) => (e as NavigationEnd).urlAfterRedirects),
    startWith(this.router.url)
  );

  private currentUrl = toSignal(this.url$, { initialValue: this.router.url });

  // Route Logic - Now checks BOTH URL and Input Filter
  showBlog = computed(() => this.checkRoute('blogs') || this.currentFilter() === 'blogs');
  showProject = computed(() => this.checkRoute('projects') || this.currentFilter() === 'projects');
  showExperience = computed(() => this.checkRoute('experience') || this.currentFilter() === 'experience');
  showStudies = computed(() => this.checkRoute('studies') || this.currentFilter() === 'studies');
  showSkills = computed(() => this.checkRoute('skills') || this.currentFilter() === 'skills');
  showCertificates = computed(() => this.checkRoute('certificates') || this.currentFilter() === 'certificates');

  private checkRoute(segment: string): boolean {
    const url = this.currentUrl().toLowerCase();
    
    // Strict Context: ONLY show if specific segment matches
    if (url.includes('/admin/todos') || url === '/admin') return false;
    
    // Specific match
    return url.includes(`/admin/${segment}`);
  }
}
