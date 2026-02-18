import { ChangeDetectionStrategy, Component, inject, signal, computed, effect, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { IdentityPanelComponent } from '../../components/identity-panel/identity-panel.component';
import { NavBarComponent, type FeedFilter } from '../../components/nav-bar/nav-bar.component';
import { FeedCardComponent, type FeedItem } from '../../components/feed-card/feed-card.component';
import { SkillCardComponent } from '../../components/skill-card/skill-card.component';
import { CertificateCardComponent } from '../../components/certificate-card/certificate-card.component';
import { ContactFormComponent } from '../../components/contact-form/contact-form.component';

import type Blog from '../../core/entities/Blogs';
import type Experience from '../../core/entities/Experience';
import type Studies from '../../core/entities/Studies';
import type Project from '../../core/entities/Projects';
import type Skill from '../../core/entities/Skils';
import type CertificateAndCourse from '../../core/entities/CertificatesAndCources';
import type Person from '../../core/entities/Person';

import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DetailModalComponent, type EntityType, type ModalMode } from '../../components/detail-modal/detail-modal.component';

// Services
import { BlogService } from '../../services/blog.service';
import { ExperienceService } from '../../services/experience.service';
import { StudiesService } from '../../services/studies.service';
import { ProjectService } from '../../services/project.service';
import { SkillService } from '../../services/skill.service';
import { CertificateService } from '../../services/certificate.service';
import { PersonService } from '../../services/person.service';

// Mocks removed


import { AdminActionsComponent } from '../../components/admin-actions/admin-actions.component'; // Import new component
import { Router } from '@angular/router';

@Component({
    selector: 'app-portfolio',
    standalone: true,
    imports: [
        CommonModule,
        IdentityPanelComponent,
        NavBarComponent,
        FeedCardComponent,
        SkillCardComponent,
        CertificateCardComponent,
        ContactFormComponent,
        DragDropModule,
        DetailModalComponent,
        AdminActionsComponent // Register new component
    ],
    templateUrl: './portfolio.page.html',
    styleUrl: './portfolio.page.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioPage implements OnInit, OnDestroy {
    private authService = inject(AuthService);
    private blogService = inject(BlogService);
    private experienceService = inject(ExperienceService);
    private studiesService = inject(StudiesService);
    private projectService = inject(ProjectService);
    private skillService = inject(SkillService);
    private certificateService = inject(CertificateService);
    private personService = inject(PersonService);
    private router = inject(Router); // Inject Router

    isAdmin = computed(() => this.authService.isAuthenticated());

    activeView = signal<'feed' | 'contact'>('feed');

    blogs = signal<Blog[]>([]);
    experience = signal<Experience[]>([]);
    studies = signal<Studies[]>([]);
    projects = signal<Project[]>([]);
    skills = signal<Skill[]>([]);
    certificates = signal<CertificateAndCourse[]>([]);
    person = signal<Person | null>(null);

    activeFilter = signal<FeedFilter>('all');
    searchQuery = signal('');

    readonly ITEMS_PER_PAGE = 4;
    currentPage = signal(0);

    /* ─── Modal State ─── */
    isModalOpen = signal(false);
    modalType = signal<EntityType>('blog');
    modalMode = signal<ModalMode>('view');
    selectedItem = signal<any>(null);

    /* ─── Sidebar auto-rotation ─── */
    sidebarTab = signal<'skills' | 'certificates'>('skills');
    private sidebarTimer: ReturnType<typeof setInterval> | null = null;
    private readonly SIDEBAR_INTERVAL = 8000; // switch every 8s

    currentExperience = computed(() =>
        this.experience().find((e: Experience) => e.states === 'current') ?? null
    );

    currentStudy = computed(() =>
        this.studies().find((s: Studies) => s.states === 'current') ?? null
    );

    feedItems = computed<FeedItem[]>(() => {
        const filter = this.activeFilter();
        const query = this.searchQuery().toLowerCase().trim();

        let items: FeedItem[] = [];

        if (filter === 'all' || filter === 'blogs') {
            items.push(...this.blogs().map((b: Blog) => ({ ...b, _type: 'blog' as const })));
        }
        if (filter === 'all' || filter === 'experience') {
            items.push(...this.experience().map((e: Experience) => ({ ...e, _type: 'experience' as const })));
        }
        if (filter === 'all' || filter === 'studies') {
            items.push(...this.studies().map((s: Studies) => ({ ...s, _type: 'studies' as const })));
        }
        if (filter === 'all' || filter === 'projects') {
            items.push(...this.projects().map((p: Project) => ({ ...p, _type: 'projects' as const })));
        }
        if (query) {
            items = items.filter((item: FeedItem) => {
                const searchable = [
                    item.Title.toLowerCase(),
                    item.Descriptions.toLowerCase(),
                ];
                if (item._type === 'blog') {
                    searchable.push(...(item as Blog & { _type: 'blog' }).Tags.map((t: string) => t.toLowerCase()));
                } else if (item._type === 'projects') {
                    searchable.push(...(item as Project & { _type: 'projects' }).Labels.map((l: string) => l.toLowerCase()));
                } else {
                    searchable.push(...(item as (Experience | Studies) & { _type: string }).Labels.map((l: string) => l.toLowerCase()));
                }
                return searchable.some((s: string) => s.includes(query));
            });
        }

        return items;
    });

    totalPages = computed(() => Math.ceil(this.feedItems().length / this.ITEMS_PER_PAGE));

    paginatedItems = computed(() => {
        const start = this.currentPage() * this.ITEMS_PER_PAGE;
        return this.feedItems().slice(start, start + this.ITEMS_PER_PAGE);
    });
    pageNumbers = computed(() => Array.from({ length: this.totalPages() }, (_: unknown, i: number) => i));
    location = computed(() => this.person()?.Location ?? 'Guayaquil, Ecuador');

    constructor() {
        effect(() => {
            this.activeFilter();
            this.searchQuery();
            this.currentPage.set(0);
        });
    }

    ngOnInit(): void {
        this.loadData();
        
        // Sync State with URL
        const url = this.router.url;
        if (url.includes('skills')) this.sidebarTab.set('skills');
        if (url.includes('certificates')) this.sidebarTab.set('certificates');
        
        // Start auto-rotation for sidebar
        this.startSidebarRotation();
    }

    loadData(): void {
        this.blogService.getAll().subscribe(res => { if(res.success) this.blogs.set(res.data || []); });
        this.experienceService.getAll().subscribe(res => { if(res.success) this.experience.set(res.data || []); });
        this.studiesService.getAll().subscribe(res => { if(res.success) this.studies.set(res.data || []); });
        this.projectService.getAll().subscribe(res => { if(res.success) this.projects.set(res.data || []); });
        this.skillService.getAll().subscribe(res => { if(res.success) this.skills.set(res.data || []); });
        this.certificateService.getAll().subscribe(res => { if(res.success) this.certificates.set(res.data || []); });
        this.personService.getAll().subscribe(res => { 
            if(res.success && res.data && res.data.length > 0) {
                this.person.set(res.data[0]); // Take the first person found
            }
        });
    }

    ngOnDestroy(): void {
        this.stopSidebarRotation();
    }

    private startSidebarRotation(): void {
        this.sidebarTimer = setInterval(() => {
            this.sidebarTab.update((tab: string) => tab === 'skills' ? 'certificates' : 'skills');
        }, this.SIDEBAR_INTERVAL);
    }

    private stopSidebarRotation(): void {
        if (this.sidebarTimer) {
            clearInterval(this.sidebarTimer);
            this.sidebarTimer = null;
        }
    }

    setSidebarTab(tab: 'skills' | 'certificates'): void {
        this.sidebarTab.set(tab);
        // Reset timer when user clicks manually
        this.stopSidebarRotation();
        this.startSidebarRotation();
    }

    onFilterChange(filter: FeedFilter): void {
        this.activeFilter.set(filter);
        this.activeView.set('feed');
    }

    onSearchChange(query: string): void {
        this.searchQuery.set(query);
    }

    goToContact(): void {
        this.activeView.set('contact');
    }

    goToFeed(): void {
        this.activeView.set('feed');
    }

    nextPage(): void {
        if (this.currentPage() < this.totalPages() - 1) {
            this.currentPage.update((p: number) => p + 1);
        }
    }

    prevPage(): void {
        if (this.currentPage() > 0) {
            this.currentPage.update((p: number) => p - 1);
        }
    }

    goToPage(page: number): void {
        this.currentPage.set(page);
    }

    /* ─── CRUD Actions ─── */

    openModal(type: EntityType, mode: ModalMode, item: any = null): void {
        this.modalType.set(type);
        this.modalMode.set(mode);
        this.selectedItem.set(item);
        this.isModalOpen.set(true);
    }

    closeModal(): void {
        this.isModalOpen.set(false);
        this.selectedItem.set(null);
    }

    onSaveItem(data: any): void {
        const type = this.modalType();
        const mode = this.modalMode();
        let service: any;

        switch (type) {
            case 'blog': service = this.blogService; break;
            case 'experience': service = this.experienceService; break;
            case 'studies': service = this.studiesService; break;
            case 'project': service = this.projectService; break;
            case 'skill': service = this.skillService; break;
            case 'certificate': service = this.certificateService; break;
            case 'person': service = this.personService; break;
        }

        if (!service) return;

        if (mode === 'create') {
            service.create(data).subscribe((res: any) => {
                 if (res.success) {
                    this.loadData();
                    this.closeModal();
                }
            });
        } else if (mode === 'edit') {
            const id = data._id || data.id; // Support both _id and id
            if (!id) {
                // Special case for Person if it doesn't exist yet but we are "editing" (conceptually creating via edit form)
                if (type === 'person') {
                     service.create(data).subscribe((res: any) => {
                        if (res.success) {
                            this.loadData();
                            this.closeModal();
                        }
                    });
                    return;
                }
                return;
            }
            service.update(id, data).subscribe((res: any) => {
                 if (res.success) {
                    this.loadData();
                    this.closeModal();
                }
            });
        }
    }

    onDelete(type: EntityType, item: any): void {
        if (!confirm('Are you sure you want to delete this item?')) return;
        
        let service: any;
        switch (type) {
            case 'blog': service = this.blogService; break;
            case 'experience': service = this.experienceService; break;
            case 'studies': service = this.studiesService; break;
            case 'project': service = this.projectService; break;
            case 'skill': service = this.skillService; break;
            case 'certificate': service = this.certificateService; break;
            case 'person': service = this.personService; break;
        }

        if (service && (item._id || item.id)) {
            service.delete(item._id || item.id).subscribe((res: any) => {
                if (res.success) this.loadData();
            });
        }
    }

    /* ─── Drag & Drop ─── */
    
    drop(event: CdkDragDrop<any[]>, listName: string): void {
        const list = [...event.container.data]; // Copy array
        moveItemInArray(list, event.previousIndex, event.currentIndex);
        
        // Optimistic update
        if (listName === 'skills') this.skills.set([...list]);
        if (listName === 'certificates') this.certificates.set([...list]);

        // Sync with backend
        const service = listName === 'skills' ? this.skillService : this.certificateService;
        
        // Assuming updateOrder takes the full array and backend handles re-indexing
        // Or if backend expects { items: [{_id, ...}] } which GenericRepository.updateOrder handles
        (service as any).updateOrder(list).subscribe((res: any) => {
             if (!res.success) {
                 // Revert on failure if needed, or just reload
                 this.loadData(); 
             }
        });
    }

    logout(): void {
        this.authService.logout();
    }
}
