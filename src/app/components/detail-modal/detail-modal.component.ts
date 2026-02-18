import { Component, input, output, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import type Blog from '../../core/entities/Blogs';
import type Project from '../../core/entities/Projects';

export type EntityType = 'blog' | 'experience' | 'studies' | 'project' | 'skill' | 'certificate' | 'person';
export type ModalMode = 'view' | 'create' | 'edit';

@Component({
    selector: 'app-detail-modal',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, DragDropModule],
    template: `
        <div class="modal-overlay" (click)="close.emit()">
            <div class="modal-container glass-card" (click)="$event.stopPropagation()">
                
                <!-- Close Button -->
                <button class="close-btn" (click)="close.emit()">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <!-- Header -->
                <div class="modal-header">
                    <h2>
                        {{ mode() === 'create' ? 'Nueva' : mode() === 'edit' ? 'Editar' : 'Detalle de' }} 
                        {{ getEntityLabel() }}
                    </h2>
                </div>

                <!-- Form (Create/Edit) -->
                @if (mode() === 'create' || mode() === 'edit') {
                    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="modal-form">
                        
                        <!-- Common Fields -->
                        @if (type() !== 'person') {
                             <div class="form-group">
                                <label>Título / Nombre</label>
                                <input type="text" formControlName="Title" placeholder="Ej: Senior Frontend Dev">
                            </div>

                            <div class="form-group">
                                <label>Descripción</label>
                                <textarea formControlName="Descriptions" rows="4" placeholder="Describe los detalles..."></textarea>
                            </div>
                        }

                        <!-- Person Fields -->
                        @if (type() === 'person') {
                            <div class="form-group">
                                <label>Nombre Completo</label>
                                <input type="text" formControlName="Name" placeholder="Ej: Eva Nazareth">
                            </div>
                            <div class="form-group">
                                <label>Título Profesional</label>
                                <input type="text" formControlName="Title" placeholder="Ej: Frontend Developer">
                            </div>
                            <div class="form-group">
                                <label>Biografía</label>
                                <textarea formControlName="Descriptions" rows="4" placeholder="Breve biografía..."></textarea>
                            </div>
                            <div class="form-group">
                                <label>Foto URL</label>
                                <input type="text" formControlName="PhotoUrl" placeholder="https://...">
                            </div>
                            <div class="form-row">
                                <div class="form-group half">
                                    <label>Ubicación</label>
                                    <input type="text" formControlName="Location" placeholder="Ej: Guayaquil, Ecuador">
                                </div>
                                <div class="form-group half">
                                    <label>Email</label>
                                    <input type="email" formControlName="Email" placeholder="correo@ejemplo.com">
                                </div>
                            </div>
                             <div class="form-row">
                                <div class="form-group half">
                                    <label>GitHub URL</label>
                                    <input type="text" formControlName="Github" placeholder="https://github.com/...">
                                </div>
                                <div class="form-group half">
                                    <label>LinkedIn URL</label>
                                    <input type="text" formControlName="Linkedin" placeholder="https://linkedin.com/in/...">
                                </div>
                            </div>
                        }


                        @if (type() === 'blog') {
                            <div class="form-group">
                                <label>Tags (separados por coma)</label>
                                <input type="text" [formControlName]="'tagsInput'" (blur)="parseTags()" placeholder="Angular, Design, UI">
                            </div>
                             <div class="form-group">
                                <label>Imágenes URL (una por línea)</label>
                                <textarea formControlName="imgsInput" (blur)="parseImgs()" rows="3" placeholder="https://..."></textarea>
                            </div>
                             <div class="form-row">
                                <div class="form-group half">
                                    <label>Fecha</label>
                                    <input type="text" formControlName="Date" placeholder="Ej: Feb 2024">
                                </div>
                                <div class="form-group half">
                                    <label>Ubicación</label>
                                    <input type="text" formControlName="Location" placeholder="Ej: Remote">
                                </div>
                            </div>
                        }

                        @if (type() === 'experience' || type() === 'studies') {
                            <div class="form-group">
                                <label>{{ type() === 'experience' ? 'Empresa' : 'Universidad' }}</label>
                                <input type="text" [formControlName]="type() === 'experience' ? 'Company' : 'University'" placeholder="Nombre de la institución">
                            </div>
                            <!-- Date handling -->
                             <div class="form-row">
                                <div class="form-group half">
                                    <label>Fecha Inicio</label>
                                    <input type="text" formControlName="DateStart" placeholder="Ej: 2020">
                                </div>
                                <div class="form-group half">
                                    <label>Fecha Fin</label>
                                    <input type="text" formControlName="DateEnd" placeholder="Ej: Presente">
                                </div>
                            </div>
                            <div class="form-group checkbox">
                                <label>
                                    <input type="checkbox" formControlName="isCurrent">
                                    Actualmente aquí
                                </label>
                            </div>
                        }
                        
                        @if (type() === 'project') {
                            <div class="form-group">
                                <label>Labels/Tech (csv)</label>
                                <input type="text" [formControlName]="'tagsInput'" (blur)="parseTags('Labels')" placeholder="React, Node, Mongo">
                            </div>
                             <div class="form-group">
                                <label>Project URL</label>
                                <input type="text" formControlName="Url" placeholder="https://...">
                            </div>
                        }
                        
                        @if (type() === 'skill') {
                            <div class="form-group">
                                <label>Icono (SVG Path o URL)</label>
                                <input type="text" formControlName="Icon" placeholder="SVG path d='...'">
                            </div>
                        }

                        <div class="form-actions">
                            <button type="button" class="btn-cancel" (click)="close.emit()">Cancelar</button>
                            <button type="submit" class="btn-save" [disabled]="form.invalid">Guardar</button>
                        </div>
                    </form>
                } 
                
                <!-- View Mode -->
                @else {
                    <div class="view-content">
                        <!-- Render view content based on type (simplified for now) -->
                         <h3>{{ item()?.Title || item()?.Name }}</h3>
                         <p class="view-desc">{{ item()?.Descriptions }}</p>
                         
                         <!-- Add more specific view details if needed -->
                    </div>
                }

            </div>
        </div>
    `,
    styles: [`
        .modal-overlay {
            position: fixed;
            top: 0; left: 0;
            width: 100vw; height: 100vh;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(4px);
            z-index: 2000;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        .modal-container {
            width: 100%;
            max-width: 600px;
            max-height: 90vh;
            overflow-y: auto;
            background: rgba(20, 20, 20, 0.95);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 30px;
            position: relative;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        .close-btn {
            position: absolute;
            top: 20px; right: 20px;
            background: transparent;
            border: none;
            color: var(--color-text-secondary);
            cursor: pointer;
        }
        .modal-header h2 {
            margin-top: 0;
            color: var(--color-text-primary);
            font-family: var(--font-heading);
        }
        .form-group {
            margin-bottom: 20px;
        }
        .form-row {
            display: flex;
            gap: 20px;
        }
        .form-group.half {
            flex: 1;
        }
        label {
            display: block;
            margin-bottom: 8px;
            color: var(--color-text-secondary);
            font-size: 0.9rem;
        }
        input, textarea {
            width: 100%;
            padding: 12px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 10px;
            color: white;
            font-family: inherit;
        }
        input:focus, textarea:focus {
            outline: none;
            border-color: var(--color-accent-primary);
            background: rgba(255, 255, 255, 0.08);
        }
        .form-actions {
            display: flex;
            justify-content: flex-end;
            gap: 15px;
            margin-top: 30px;
        }
        .btn-cancel {
            background: transparent;
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            padding: 10px 20px;
            border-radius: 10px;
            cursor: pointer;
        }
        .btn-save {
            background: var(--color-accent-primary);
            border: none;
            color: var(--color-bg-primary);
            padding: 10px 20px;
            border-radius: 10px;
            font-weight: bold;
            cursor: pointer;
        }
        .btn-save:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        .view-content h3 {
            color: var(--color-text-primary);
            font-size: 1.5rem;
        }
        .view-desc {
            color: var(--color-text-secondary);
            line-height: 1.6;
        }
    `]
})
export class DetailModalComponent {
    type = input.required<EntityType>();
    mode = input.required<ModalMode>();
    item = input<any>(null);
    close = output<void>();
    saveItem = output<any>();

    fb = inject(FormBuilder);
    form!: FormGroup;

    constructor() {
        effect(() => {
            this.initForm();
        });
    }

    getEntityLabel(): string {
        switch (this.type()) {
            case 'blog': return 'Blog Post';
            case 'experience': return 'Experiencia';
            case 'studies': return 'Estudios';
            case 'project': return 'Proyecto';
            case 'skill': return 'Habilidad';
            case 'certificate': return 'Certificado';
            case 'person': return 'Perfil';
            default: return 'Item';
        }
    }

    initForm() {
        const item = this.item() || {};
        const type = this.type();

        // Base fields
        let group: any = {
            Title: [item.Title || '', Validators.required],
            Descriptions: [item.Descriptions || '', Validators.required],
        };

        if (type === 'person') {
            group = { // Override for Person
                Name: [item.Name || '', Validators.required],
                Title: [item.Title || '', Validators.required],
                Descriptions: [item.Descriptions || '', Validators.required],
                PhotoUrl: [item.PhotoUrl || '', Validators.required],
                Github: [item.Github || ''],
                Linkedin: [item.Linkedin || ''],
                Email: [item.Email || ''],
                Location: [item.Location || '', Validators.required],
            };
        } else if (type === 'blog') {
            group = {
                ...group,
                Date: [item.Date || ''],
                Location: [item.Location || ''],
                tagsInput: [item.Tags ? item.Tags.join(', ') : ''],
                imgsInput: [item.ImgesUrls ? item.ImgesUrls.join('\\n') : '']
            };
        } else if (type === 'experience' || type === 'studies') {
            group = {
                ...group,
                Company: [item.Company || ''],
                University: [item.University || ''],
                DateStart: [item.DateStart || ''],
                DateEnd: [item.DateEnd || ''],
                isCurrent: [item.states === 'current']
            };
        } else if (type === 'project') {
             group = {
                ...group,
                Url: [item.Url || ''],
                tagsInput: [item.Labels ? item.Labels.join(', ') : '']
            };
        } else if (type === 'skill') {
             group = {
                ...group,
                Icon: [item.Icon || '']
            };
        }

        // Add ID if editing
        if (item._id || item.id) {
            // we will merge it on submit, but good to know
        }

        this.form = this.fb.group(group);
    }

    parseTags(field: string = 'Tags') {
        const val = this.form.get('tagsInput')?.value;
        if (val) {
             // Logic could be here, but we handle it on submit for simplicity in this reactive form
        }
    }
    
    parseImgs() {
         // Logic could be here
    }

    onSubmit() {
        if (this.form.invalid) return;
        
        const formVal = this.form.value;
        const item = this.item() || {};
        
        // Final object preparation
        let finalData = { ...item, ...formVal };

        if (this.type() === 'blog') {
            finalData.Tags = formVal.tagsInput ? formVal.tagsInput.split(',').map((t: string) => t.trim()) : [];
            finalData.ImgesUrls = formVal.imgsInput ? formVal.imgsInput.split('\\n').map((l: string) => l.trim()).filter((l: string) => l) : [];
        } else if (this.type() === 'project') {
             finalData.Labels = formVal.tagsInput ? formVal.tagsInput.split(',').map((t: string) => t.trim()) : [];
        } else if (this.type() === 'experience' || this.type() === 'studies') {
             finalData.states = formVal.isCurrent ? 'current' : 'finished'; // Simple toggle for now
        }

        this.saveItem.emit(finalData);
    }
}
