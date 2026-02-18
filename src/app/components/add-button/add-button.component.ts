import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-add-button',
    standalone: true,
    template: `
        <button class="add-btn">
            <span class="icon">+</span>
        </button>
    `,
    styles: [`
        .add-btn {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            background: #ec4899;
            border: none;
            color: white;
            font-size: 1.25rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        }
        
        .add-btn:hover {
            background: #db2777;
            transform: scale(1.1);
        }
        
        .icon {
            line-height: 1;
            margin-top: -2px;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddButtonComponent {}
