import { Component, input, output, signal, effect, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import type Blog from '../../core/entities/Blogs';
import type Project from '../../core/entities/Projects';
import type Experience from '../../core/entities/Experience';
import type Studies from '../../core/entities/Studies';
import type Skill from '../../core/entities/Skils';
import type CertificateAndCourse from '../../core/entities/CertificatesAndCources';

export type EntityType = 'blog' | 'project' | 'experience' | 'studies' | 'skill' | 'certificate';
export type ModalMode = 'view' | 'edit' | 'create';

@Component({
  selector: 'app-detail-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-overlay" (click)="close.emit()">
      <div class="modal-content glass-card" (click)="$event.stopPropagation()">
        <!-- Header -->
        <div class="modal-header">
          <h2 class="modal-title">
            @if (mode() === 'create') { New {{ type() | titlecase }} }
            @else if (mode() === 'edit') { Edit {{ type() | titlecase }} }
            @else { {{ item()?.Title }} }
          </h2>
          <button class="close-btn" (click)="close.emit()">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <!-- Body -->
        <div class="modal-body dark-scrollbar">
          
          <!-- VIEW MODE -->
          @if (mode() === 'view') {
            <div class="view-content">
              @if (item()?.Descriptions; as desc) {
                <p class="description">{{ desc }}</p>
              }
              
              <!-- Repo/Demo for Projects -->
              @if (type() === 'project') {
                <div class="links-row">
                  @if (AsProject(item())?.Repository; as repo) {
                    <a [href]="repo" target="_blank" class="chip chip--accent">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                      Repository
                    </a>
                  }
                  @if (AsProject(item())?.Demo; as demo) {
                    <a [href]="demo" target="_blank" class="chip chip--success">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>
                      Live Demo
                    </a>
                  }
                </div>
              }

              <!-- Tags/Labels -->
               @if (getLabels().length > 0) {
                 <div class="labels-row">
                   @for (label of getLabels(); track label) {
                     <span class="chip">{{ label }}</span>
                   }
                 </div>
               }
            </div>
          } 
          
          <!-- EDIT / CREATE MODE -->
          @else {
            <form (ngSubmit)="save()" class="edit-form">
              <!-- Common: Title -->
              <div class="form-group">
                <label>Title</label>
                <input type="text" [(ngModel)]="formData.Title" name="title" required class="glass-input">
              </div>

              <!-- Common: Description -->
              <div class="form-group">
                <label>Description</label>
                <textarea [(ngModel)]="formData.Descriptions" name="description" rows="4" class="glass-input"></textarea>
              </div>

              <!-- Type Specific -->
              @if (type() === 'project') {
                <div class="form-group">
                  <label>Repository URL</label>
                  <input type="text" [(ngModel)]="formData.Repository" name="repository" class="glass-input">
                </div>
                <div class="form-group">
                  <label>Demo URL</label>
                  <input type="text" [(ngModel)]="formData.Demo" name="demo" class="glass-input">
                </div>
                <div class="form-group">
                  <label>Labels (comma separated)</label>
                  <input type="text" [ngModel]="formData.Labels?.join(', ')" (ngModelChange)="updateLabels($event)" name="labels" class="glass-input">
                </div>
              }

                @if (type() === 'blog') {
                   <div class="form-group">
                    <label>Tags (comma separated)</label>
                    <input type="text" [ngModel]="formData.Tags?.join(', ')" (ngModelChange)="updateTags($event)" name="tags" class="glass-input">
                  </div>
                  <div class="form-group">
                    <label>Location</label>
                    <input type="text" [(ngModel)]="formData.Location" name="location" class="glass-input">
                  </div>
                  <div class="form-group">
                    <label>Images (comma separated URLs)</label>
                    <input type="text" [ngModel]="formData.ImgesUrls?.join(', ')" (ngModelChange)="updateImages($event)" name="images" class="glass-input">
                  </div>
                }

              <!-- Experience/Studies Dates -->
               @if (type() === 'experience' || type() === 'studies' || type() === 'certificate') {
                  <div class="form-row">
                    <div class="form-group">
                        <label>Start</label>
                        <input type="text" [(ngModel)]="formData.Start" name="start" class="glass-input" placeholder="YYYY or Month YYYY">
                    </div>
                    <div class="form-group">
                        <label>End</label>
                        <input type="text" [(ngModel)]="formData.End" name="end" class="glass-input" placeholder="Present or date">
                    </div>
                  </div>
                  @if (type() === 'experience') {
                      <div class="form-group">
                          <label>Company</label>
                          <input type="text" [(ngModel)]="formData.Company" name="company" class="glass-input">
                      </div>
                  }
                  @if (type() === 'studies') {
                      <div class="form-group">
                          <label>University</label>
                          <input type="text" [(ngModel)]="formData.University" name="university" class="glass-input">
                      </div>
                  }
               }

               @if (type() === 'skill') {
                  <div class="form-group">
                      <label>Type (Frontend, Backend, etc.)</label>
                      <input type="text" [(ngModel)]="formData.Type" name="skillType" class="glass-input">
                  </div>
               }

              <div class="form-actions">
                <button type="submit" class="btn-save">Save</button>
                <button type="button" class="btn-cancel" (click)="close.emit()">Cancel</button>
              </div>
            </form>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(5px);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: fadeIn 0.2s ease-out;
    }

    .modal-content {
      width: 90%;
      max-width: 600px;
      max-height: 85vh;
      display: flex;
      flex-direction: column;
      animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      background: rgba(30, 30, 30, 0.8) !important; 
    }

    .modal-header {
      padding: 1.25rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .modal-title {
      margin: 0;
      font-family: 'Architects Daughter', cursive;
      color: #f3f4f6;
      font-size: 1.5rem;
      letter-spacing: 0.05em;
    }

    .close-btn {
      background: transparent;
      border: none;
      color: #9ca3af;
      cursor: pointer;
      display: flex;
      padding: 4px;
      border-radius: 50%;
      transition: all 0.2s;
    }
    .close-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }

    .modal-body {
      padding: 1.5rem;
      overflow-y: auto;
      flex: 1;
    }

    .view-content {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      color: #d1d5db;
    }

    .description {
        white-space: pre-wrap;
        line-height: 1.6;
        font-size: 1rem;
    }

    .links-row {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .labels-row {
        display: flex;
        gap: 0.5rem;
        flex-wrap: wrap;
        margin-top: 0.5rem;
    }

    .chip {
        padding: 0.3rem 0.8rem;
        border-radius: 99px;
        font-size: 0.8rem;
        background: rgba(255,255,255,0.1);
        color: #e5e7eb;
        text-decoration: none;
        display: inline-flex;
        align-items: center;
        gap: 0.4rem;
        transition: all 0.2s;
    }
    .chip:hover {
        background: rgba(255,255,255,0.2);
    }
    .chip--accent { border: 1px solid #a29bfe; color: #a29bfe; background: rgba(162, 155, 254, 0.1); }
    .chip--success { border: 1px solid #00b894; color: #00b894; background: rgba(0, 184, 148, 0.1); }

    /* FORM STYLES */
    .edit-form {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }

    label {
        font-size: 0.85rem;
        color: #9ca3af;
        margin-left: 0.25rem;
    }

    .glass-input {
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        padding: 0.8rem 1rem;
        color: #fff;
        font-family: inherit;
        font-size: 0.95rem;
        transition: all 0.2s;
    }
    .glass-input:focus {
        outline: none;
        border-color: #74b9ff;
        background: rgba(0, 0, 0, 0.5);
    }
    textarea.glass-input {
        resize: vertical;
        min-height: 100px;
    }

    .form-actions {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
        justify-content: flex-end;
    }

    .btn-save {
        background: #00b894;
        color: #fff;
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
    }
    .btn-save:hover { background: #00a884; transform: translateY(-1px); }

    .btn-cancel {
        background: transparent;
        color: #d1d5db;
        border: 1px solid rgba(255, 255, 255, 0.2);
        padding: 0.75rem 1.5rem;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.2s;
    }
    .btn-cancel:hover { background: rgba(255, 255, 255, 0.05); }

    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  `]
})
export class DetailModalComponent {
  item = input<any>();
  type = input.required<EntityType>();
  mode = input.required<ModalMode>();
  
  close = output<void>();
  saveItem = output<any>();

  // Mutable form data
  formData: any = {};

  constructor() {
    effect(() => {
        const it = this.item();
        if (it) {
            this.formData = JSON.parse(JSON.stringify(it)); // Deep copy
        } else {
            this.formData = {}; // New item
        }
    });
  }

  save() {
      this.saveItem.emit(this.formData);
  }

  updateLabels(val: string) {
      this.formData.Labels = val.split(',').map(s => s.trim()).filter(s => s);
  }

  updateTags(val: string) {
      this.formData.Tags = val.split(',').map(s => s.trim()).filter(s => s);
  }

  updateImages(val: string) {
      this.formData.ImgesUrls = val.split(',').map(s => s.trim()).filter(s => s);
  }

  // Type Guards for Template Helper
  AsProject(val: any): Project | null { return this.type() === 'project' ? val as Project : null; }

  getLabels(): string[] {
      const t = this.type();
      const i = this.item();
      if (!i) return [];
      if (t === 'project') return (i as Project).Labels || [];
      if (t === 'blog') return (i as Blog).Tags || [];
      if (t === 'experience' || t === 'studies') return (i as any).Labels || [];
      return [];
  }
}
