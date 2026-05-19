import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../shared/components/button.component';
import { ModalComponent } from '../shared/components/modal.component';
import { Ventilator } from '../shared/models';

@Component({
  selector: 'app-ventilation',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, ModalComponent],
  template: `
    <div class="page-container">
      <div class="page-header">

        <p class="page-description">Monitoreo y control de ventiladores del galpón</p>
      </div>

      <div class="page-controls">
        <app-button
          variant="primary"
          [disabled]="selectedVentilator() === null"
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
              <th>Ventilador</th>
              <th>Entrada</th>
              <th>Salida</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            @for (ventilator of ventilators(); track ventilator.id) {
              <tr
                [class.selected]="selectedVentilator()?.id === ventilator.id"
                (click)="selectVentilator(ventilator)"
                class="table-row"
              >
                <td class="td-checkbox">
                  <input
                    type="checkbox"
                    class="checkbox"
                    [checked]="selectedVentilator()?.id === ventilator.id"
                    (click)="$event.stopPropagation()"
                  />
                </td>
                <td>{{ ventilator.name }}</td>
                <td>{{ ventilator.entrada }}</td>
                <td>{{ ventilator.salida }}</td>
                <td>
                  <span [class]="'status status-' + ventilator.estado.toLowerCase()">
                    {{ ventilator.estado }}
                  </span>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <app-modal
        [isOpen]="showEditModal()"
        title="Editar Ventilador"
        (closeModal)="closeEditModal()"
      >
        @if (selectedVentilator()) {
          <div class="modal-form">
            <div class="form-group">
              <label>Número de Ventilador</label>
              <input type="text" [value]="selectedVentilator()!.name" disabled />
            </div>

            <div class="form-group">
              <label>Entrada</label>
              <input type="text" [(ngModel)]="editFormData.entrada" />
            </div>

            <div class="form-group">
              <label>Salida</label>
              <input type="text" [(ngModel)]="editFormData.salida" />
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
      display: block;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
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
      width: 100%;
      box-sizing: border-box;
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

    .status {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    .status-activo {
      background-color: #c8e6c9;
      color: #2e7d32;
    }

    .status-inactivo {
      background-color: #ffcdd2;
      color: #d32f2f;
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
    class: 'ventilation-component'
  }
})
export class VentilationComponent {
  ventilators = signal<Ventilator[]>([
    { id: 1, name: 'Ventilador 1', entrada: '220V', salida: '60%', estado: 'Activo' },
    { id: 2, name: 'Ventilador 2', entrada: '220V', salida: '70%', estado: 'Activo' },
    { id: 3, name: 'Ventilador 3', entrada: '220V', salida: '50%', estado: 'Activo' },
    { id: 4, name: 'Ventilador 4', entrada: '220V', salida: '65%', estado: 'Activo' }
  ]);

  selectedVentilator = signal<Ventilator | null>(null);
  showEditModal = signal(false);
  editFormData = {
    entrada: '',
    salida: ''
  };

  selectVentilator(ventilator: Ventilator) {
    this.selectedVentilator.set(ventilator);
  }

  openEditModal() {
    const selected = this.selectedVentilator();
    if (selected) {
      this.editFormData = {
        entrada: selected.entrada,
        salida: selected.salida
      };
      this.showEditModal.set(true);
    }
  }

  closeEditModal() {
    this.showEditModal.set(false);
  }

  saveEdit() {
    const selected = this.selectedVentilator();
    if (selected) {
      const updated = this.ventilators().map(v =>
        v.id === selected.id
          ? { ...v, ...this.editFormData }
          : v
      );
      this.ventilators.set(updated);
      this.closeEditModal();
    }
  }
}
