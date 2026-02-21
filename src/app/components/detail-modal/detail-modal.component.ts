import { Component, input, output, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import type Blog from '../../core/entities/Blogs';
import type Project from '../../core/entities/Projects';
import ProjectsStatus from '../../core/enums/projects_status';
import SkillsTypes from '../../core/enums/skills_types';
import TypeWorks from '../../core/enums/work_types';

export type EntityType = 'blog' | 'experience' | 'studies' | 'project' | 'skill' | 'certificate' | 'person';
export type ModalMode = 'view' | 'create' | 'edit';

@Component({
    selector: 'app-detail-modal',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, DragDropModule],
    templateUrl: './detail-modal.component.html',
    styleUrls: ['./detail-modal.component.css']
})
export class DetailModalComponent {
    type = input.required<EntityType>();
    mode = input.required<ModalMode>();
    item = input<any>(null);
    close = output<void>();
    saveItem = output<any>();

    fb = inject(FormBuilder);
    form!: FormGroup;

    // Enums for template
    projectStatuses = Object.values(ProjectsStatus);
    skillTypes = Object.values(SkillsTypes);
    workTypes = Object.values(TypeWorks);

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

        // Base fields Common
        let group: any = {
            Title: [item.Title || '', Validators.required],
            Descriptions: [item.Descriptions || '', Validators.required],
            index: [item.index || 0] // Default index to 0
        };

        if (type === 'person') {
            group = {
                Name: [item.Name || '', Validators.required],
                Title: [item.Title || '', Validators.required],
                Descriptions: [item.Descriptions || '', Validators.required],
                PhotoUrl: [item.PhotoUrl || '', Validators.required],
                CVUrl: [item.CVUrl || ''],
                Github: [item.Github || ''],
                Linkedin: [item.Linkedin || ''],
                Email: [item.Email || ''],
                Location: [item.Location || '', Validators.required],
                index: [item.index || 0]
            };
        } else if (type === 'blog') {
            group = {
                ...group,
                Date: [item.Date || ''],
                Location: [item.Location || ''],
                tagsInput: [item.Tags ? item.Tags.join(', ') : ''],
                imgsInput: [item.ImgesUrls ? item.ImgesUrls.join(', ') : '']
            };
        } else if (type === 'experience') {
            group = {
                ...group,
                Company: [item.Company || '', Validators.required],
                Start: [item.Start || '', Validators.required],
                End: [item.End || ''],
                isCurrent: [item.states === 'current'],
                types: [item.types || []],
                tagsInput: [item.Labels ? item.Labels.join(', ') : '']
            };
        } else if (type === 'studies') {
            group = {
                ...group,
                University: [item.University || '', Validators.required],
                Start: [item.Start || '', Validators.required],
                End: [item.End || ''],
                isCurrent: [item.states === 'current'],
                tagsInput: [item.Labels ? item.Labels.join(', ') : '']
            };
        } else if (type === 'certificate') { // Handled like studies but check entity
             group = {
                ...group,
                University: [item.University || '', Validators.required],
                Start: [item.Start || '', Validators.required],
                End: [item.End || ''],
                isCurrent: [item.states === 'current'],
                tagsInput: [item.Labels ? item.Labels.join(', ') : '']
            };
        } else if (type === 'project') {
             group = {
                ...group,
                Demo: [item.Demo || ''],
                Repository: [item.Repository || '', Validators.required],
                Status: [item.Status || ProjectsStatus.Planned],
                tagsInput: [item.Labels ? item.Labels.join(', ') : ''],
                imgsInput: [item.ImgesUrls ? item.ImgesUrls.join(', ') : '']
            };
        } else if (type === 'skill') {
             group = {
                ...group,
                Icon: [item.Icon || ''],
                Type: [item.Type || SkillsTypes.Other]
            };
        }

        this.form = this.fb.group(group);
    }

    onSubmit() {
        if (this.form.invalid) return;
        
        const formVal = this.form.value;
        const item = this.item() || {};
        
        // Final object preparation
        let finalData = { ...item, ...formVal };

        // Process Arrays and Specific Fields
        if (this.type() === 'blog') {
            finalData.Tags = formVal.tagsInput ? formVal.tagsInput.split(',').map((t: string) => t.trim()) : [];
            finalData.ImgesUrls = formVal.imgsInput ? formVal.imgsInput.split(',').map((l: string) => l.trim()).filter((l: string) => l) : [];
        } else if (this.type() === 'project') {
             finalData.Labels = formVal.tagsInput ? formVal.tagsInput.split(',').map((t: string) => t.trim()) : [];
             finalData.ImgesUrls = formVal.imgsInput ? formVal.imgsInput.split(',').map((l: string) => l.trim()).filter((l: string) => l) : [];
        } else if (this.type() === 'experience' || this.type() === 'studies' || this.type() === 'certificate') {
             finalData.states = formVal.isCurrent ? 'current' : 'past';
             finalData.Labels = formVal.tagsInput ? formVal.tagsInput.split(',').map((t: string) => t.trim()) : [];
        }

        // Clean up helper fields that are not in entity
        delete finalData.tagsInput;
        delete finalData.imgsInput;
        delete finalData.isCurrent;

        this.saveItem.emit(finalData);
    }
}
