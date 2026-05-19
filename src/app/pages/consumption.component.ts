import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../shared/components/button.component';
import { ModalComponent } from '../shared/components/modal.component';
import { ConsumptionRecord } from '../shared/models';

@Component({
  selector: 'app-consumption',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, ModalComponent],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1 class="page-title">Registros de Consumo Diario</h1>
        <p class="page-description">Seguimiento del consumo de alimento</p>
      </div>

      <div class="page-controls">
        <app-button variant="primary" (click)="openAddModal()">
          + Añadir Nuevo Registro
        </app-button>
      </div>

      <div class="table-container">
        <table class="table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Edad del Pollo</th>
              <th>Consumo Total (kg)</th>
            </tr>
          </thead>
          <tbody>
            @for (record of records(); track record.id) {
              <tr class="table-row">
                <td>{{ record.fecha }}</td>
                <td>{{ record.edadPollo }} días</td>
                <td>{{ record.consumoTotal }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <app-modal
        [isOpen]="showAddModal()"
        title="Nuevo Registro de Consumo"
        (closeModal)="closeAddModal()"
      >
        <div class="modal-form">
          <div class="form-group">
            <label>Fecha de Registro</label>
            <input type="date" [value]="getTodayDate()" disabled />
          </div>

          <div class="form-group">
            <label>Edad del Pollo (días)</label>
            <input type="number" [(ngModel)]="formData.edadPollo" />
          </div>

          <div class="form-group">
            <label>Consumo de Alimento (kg)</label>
            <input type="number" step="0.01" [(ngModel)]="formData.consumoTotal" />
          </div>

          <div class="form-actions">
            <app-button variant="primary" (click)="saveRecord()">
              Guardar Registro
            </app-button>
            <app-button variant="secondary" (click)="closeAddModal()">
              Cancelar
            </app-button>
          </div>
        </div>
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

    td {
      padding: 16px;
      border-bottom: 1px solid #f0f0f0;
      font-size: 14px;
      color: #333;
    }

    .table-row:hover {
      background-color: #f9f9f9;
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
    class: 'consumption-component'
  }
})
export class ConsumptionComponent {
  records = signal<ConsumptionRecord[]>([
    { id: 1, fecha: '2026-05-15', edadPollo: 20, consumoTotal: 45.5 },
    { id: 2, fecha: '2026-05-16', edadPollo: 21, consumoTotal: 47.2 },
    { id: 3, fecha: '2026-05-17', edadPollo: 22, consumoTotal: 48.8 }
  ]);

  showAddModal = signal(false);
  formData = {
    edadPollo: 0,
    consumoTotal: 0
  };

  openAddModal() {
    this.formData = { edadPollo: 0, consumoTotal: 0 };
    this.showAddModal.set(true);
  }

  closeAddModal() {
    this.showAddModal.set(false);
  }

  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  saveRecord() {
    const newRecord: ConsumptionRecord = {
      id: this.records().length + 1,
      fecha: this.getTodayDate(),
      edadPollo: this.formData.edadPollo,
      consumoTotal: this.formData.consumoTotal
    };

    this.records.update(r => [newRecord, ...r]);
    this.closeAddModal();
  }
}
