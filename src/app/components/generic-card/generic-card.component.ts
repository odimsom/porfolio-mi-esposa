import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-generic-card',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div class="card" [class.draggable]="showControls()">
            <div class="card-content">
                <h3>{{ data().Title || 'Sin título' }}</h3>
                <p>{{ data().Descriptions || 'Sin descripción' }}</p>
            </div>
            @if (showControls()) {
                <div class="card-controls">
                    <button class="edit-btn" (click)="edit.emit()">✏️</button>
                    <button class="delete-btn" (click)="delete.emit()">🗑️</button>
                    <span class="drag-handle">⋮⋮</span>
                </div>
            }
        </div>
    `,
    styles: [`
        .card {
            background: white;
            border: 2px solid #e5e5e5;
            border-radius: 6px;
            padding: 0.75rem;
            min-width: 120px;
            transition: all 0.2s ease;
        }
        
        .card.draggable {
            cursor: grab;
        }
        
        .card.draggable:hover {
            border-color: #ec4899;
            box-shadow: 0 2px 8px rgba(236, 72, 153, 0.2);
        }
        
        .card-content h3 {
            margin: 0 0 0.25rem 0;
            font-size: 0.875rem;
            color: #333;
        }
        
        .card-content p {
            margin: 0;
            font-size: 0.75rem;
            color: #666;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
        }
        
        .card-controls {
            display: flex;
            gap: 0.25rem;
            margin-top: 0.5rem;
            padding-top: 0.5rem;
            border-top: 1px solid #eee;
            align-items: center;
        }
        
        .edit-btn, .delete-btn {
            background: none;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 0.25rem 0.5rem;
            cursor: pointer;
            font-size: 0.75rem;
        }
        
        .edit-btn:hover {
            background: #fef3c7;
            border-color: #f59e0b;
        }
        
        .delete-btn:hover {
            background: #fee2e2;
            border-color: #ef4444;
        }
        
        .drag-handle {
            margin-left: auto;
            color: #999;
            cursor: grab;
            font-weight: bold;
            letter-spacing: -2px;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericCardComponent {
    data = input.required<any>();
    showControls = input(false);
    
    edit = output<void>();
    delete = output<void>();
}
