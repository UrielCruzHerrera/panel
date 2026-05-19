import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../shared/components/button.component';
import { ModalComponent } from '../shared/components/modal.component';
import { Brooder } from '../shared/models';

@Component({
  selector: 'app-brooders',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, ModalComponent],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">Gestión de Criadoras</h1>
        <p class="page-description">Monitoreo y control de criadoras del galpón</p>
      </div>

      <div class="page-controls">
        <app-button
          variant="primary"
          [disabled]="selectedBrooder() === null"
          (click)="openEditModal()"
        >
          Editar
        </app-button>
      </div>

      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th class="th-checkbox">
                <input type="checkbox" class="checkbox" aria-label="Seleccionar todo" />
              </th>
              <th>Criadora</th>
              <th>Entrada</th>
              <th>Salida</th>
              <th>Tiempo</th>
            </tr>
          </thead>
          <tbody>
            @for (brooder of brooders(); track brooder.id) {
              <tr
                [class.selected]="selectedBrooder()?.id === brooder.id"
                (click)="selectBrooder(brooder)"
                class="table-row"
              >
                <td class="td-checkbox">
                  <input
                    type="checkbox"
                    class="checkbox"
                    [checked]="selectedBrooder()?.id === brooder.id"
                    (click)="$event.stopPropagation()"
                  />
                </td>
                <td>{{ brooder.name }}</td>
                <td>{{ brooder.entrada }}</td>
                <td>{{ brooder.salida }}</td>
                <td>{{ brooder.tiempo }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <app-modal
        [isOpen]="showEditModal()"
        title="Editar Criadora"
        (closeModal)="closeEditModal()"
      >
        @if (selectedBrooder()) {
          <div class="modal-form">
            <div class="form-group">
              <label>Número de Criadora</label>
              <input type="text" [value]="selectedBrooder()!.name" disabled />
            </div>

            <div class="form-group">
              <label>Entrada</label>
              <input type="text" [(ngModel)]="editFormData.entrada" />
            </div>

            <div class="form-group">
              <label>Salida</label>
              <input type="text" [(ngModel)]="editFormData.salida" />
            </div>

            <div class="form-group">
              <label>Tiempo</label>
              <input type="text" [(ngModel)]="editFormData.tiempo" />
            </div>

            <div class="form-actions">
              <app-button variant="primary" (click)="saveEdit()">
                Guardar
              </app-button>
              <app-button variant="secondary" (click)="closeEditModal()">
                Cancelar
              </app-button>
            </div>
          </div>
        }
      </app-modal>
    </div>
  `,
  styles: [`
    .page-container {
      max-width: 1000px;
    }

    .page-header {
      margin-bottom: 24px;
    }

    .page-title {
      margin: 0 0 8px 0;
      font-size: 24px;
      font-weight: 600;
      color: #001d4a;
    }

    .page-description {
      margin: 0;
      font-size: 14px;
      color: #999;
    }

    .page-controls {
      display: flex;
      gap: 12px;
      margin-bottom: 24px;
    }

    .table-container {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .table {
      width: 100%;
      border-collapse: collapse;
    }

    thead {
      background-color: #f5f5f5;
    }

    th {
      padding: 16px;
      text-align: left;
      font-weight: 600;
      font-size: 12px;
      text-transform: uppercase;
      color: #666;
      border-bottom: 2px solid #e0e0e0;
      letter-spacing: 0.5px;
    }

    .th-checkbox {
      width: 50px;
      text-align: center;
    }

    td {
      padding: 16px;
      border-bottom: 1px solid #f0f0f0;
      font-size: 14px;
      color: #333;
    }

    .td-checkbox {
      width: 50px;
      text-align: center;
    }

    .table-row {
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .table-row:hover {
      background-color: #f9f9f9;
    }

    .table-row.selected {
      background-color: #f3fcf0;
    }

    .checkbox {
      width: 18px;
      height: 18px;
      cursor: pointer;
      accent-color: #357266;
    }

    .modal-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    .form-group label {
      font-size: 14px;
      font-weight: 600;
      color: #333;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    .form-group input {
      padding: 10px 12px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 14px;
      transition: border-color 0.2s ease;
    }

    .form-group input:not(:disabled):focus {
      outline: none;
      border-color: #357266;
      box-shadow: 0 0 0 3px rgba(53, 114, 102, 0.1);
    }

    .form-group input:disabled {
      background-color: #f5f5f5;
      color: #999;
    }

    .form-actions {
      display: flex;
      gap: 12px;
      margin-top: 16px;
      justify-content: flex-end;
    }
  `],
  host: {
    class: 'brooders-component'
  }
})
export class BroodersComponent {
  brooders = signal<Brooder[]>([
    { id: 1, name: 'Criadora 1', entrada: 'Lado A', salida: 'Lado B', tiempo: '1h 45m' },
    { id: 2, name: 'Criadora 2', entrada: 'Lado C', salida: 'Lado D', tiempo: '1h 45m' },
    { id: 3, name: 'Criadora 3', entrada: 'Lado E', salida: 'Lado F', tiempo: '1h 45m' }
  ]);

  selectedBrooder = signal<Brooder | null>(null);
  showEditModal = signal(false);
  editFormData = {
    entrada: '',
    salida: '',
    tiempo: ''
  };

  selectBrooder(brooder: Brooder) {
    this.selectedBrooder.set(brooder);
  }

  openEditModal() {
    const selected = this.selectedBrooder();
    if (selected) {
      this.editFormData = {
        entrada: selected.entrada,
        salida: selected.salida,
        tiempo: selected.tiempo
      };
      this.showEditModal.set(true);
    }
  }

  closeEditModal() {
    this.showEditModal.set(false);
  }

  saveEdit() {
    const selected = this.selectedBrooder();
    if (selected) {
      const updated = this.brooders().map(b =>
        b.id === selected.id
          ? { ...b, ...this.editFormData }
          : b
      );
      this.brooders.set(updated);
      this.closeEditModal();
    }
  }
}
