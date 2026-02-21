import { ChangeDetectionStrategy, Component, input, computed, signal, OnInit, OnDestroy, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import type Blog from '../../core/entities/Blogs';
import type Experience from '../../core/entities/Experience';
import type Studies from '../../core/entities/Studies';
import type Project from '../../core/entities/Projects';

export type FeedItem =
    | (Blog & { _type: 'blog' })
    | (Experience & { _type: 'experience' })
    | (Studies & { _type: 'studies' })
    | (Project & { _type: 'projects' });

@Component({
    selector: 'app-feed-card',
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './feed-card.component.html',
    styleUrls: ['./feed-card.component.css']
})
export class FeedCardComponent implements OnInit, OnDestroy {
    item = input.required<FeedItem>();
    isAdmin = input<boolean>(false);

    edit = output<void>();
    delete = output<void>();
    view = output<void>();

    private carouselTimer: ReturnType<typeof setInterval> | null = null;
    currentImageIndex = signal(0);

    badgeLabel = computed(() => {
        const t = this.item()._type;
        if (t === 'blog') return 'Blog';
        if (t === 'experience') return 'Experiencia';
        if (t === 'studies') return 'Estudios';
        if (t === 'projects') return 'Proyecto';
        return '';
    });

    allImages = computed(() => {
        const it = this.item();
        if (it._type === 'blog') {
            return (it as Blog & { _type: 'blog' }).ImgesUrls ?? [];
        }
        if (it._type === 'projects') {
            return (it as Project & { _type: 'projects' }).ImgesUrls ?? [];
        }
        return [];
    });

    dateRange = computed(() => {
        const it = this.item();
        if (it._type === 'blog') return it.Date;
        if (it._type === 'projects') return '';
        const start = (it as Experience | Studies).Start;
        const end = (it as Experience | Studies).End;
        return end ? `${start} — ${end}` : `${start} — Presente`;
    });

    subtitle = computed(() => {
        const it = this.item();
        if (it._type === 'experience') return (it as Experience & { _type: 'experience' }).Company;
        if (it._type === 'studies') return (it as Studies & { _type: 'studies' }).University;
        if (it._type === 'blog') return (it as Blog & { _type: 'blog' }).Location;
        return '';
    });

    labels = computed(() => {
        const it = this.item();
        if (it._type === 'blog') return (it as Blog & { _type: 'blog' }).Tags;
        if (it._type === 'projects') return (it as Project & { _type: 'projects' }).Labels;
        return (it as (Experience | Studies) & { _type: string }).Labels;
    });

    isCurrent = computed(() => {
        const it = this.item();
        if (it._type === 'experience') return (it as Experience & { _type: 'experience' }).states === 'current';
        if (it._type === 'studies') return (it as Studies & { _type: 'studies' }).states === 'current';
        return false;
    });

    projectRepo = computed(() => {
        const it = this.item();
        return it._type === 'projects' ? (it as Project & { _type: 'projects' }).Repository : null;
    });

    projectDemo = computed(() => {
        const it = this.item();
        return it._type === 'projects' ? (it as Project & { _type: 'projects' }).Demo : null;
    });

    ngOnInit(): void {
        const images = this.allImages();
        if (images.length > 1) {
            this.carouselTimer = setInterval(() => {
                this.currentImageIndex.update((i: number) => (i + 1) % images.length);
            }, 4000);
        }
    }

    ngOnDestroy(): void {
        if (this.carouselTimer) {
            clearInterval(this.carouselTimer);
        }
    }
}
