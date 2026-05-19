import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../shared/components/button.component';
import { ModalComponent } from '../shared/components/modal.component';
import { MedicationRecord } from '../shared/models';

@Component({
  selector: 'app-medication',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, ModalComponent],
  template: `
    <div class="page-container">
      <div class="page-header">
        <p class="page-description">Seguimiento de tratamientos y medicamentos aplicados</p>
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
              <th>Edad</th>
              <th>Nombre del Tratamiento</th>
              <th>Dosis</th>
              <th>Duración</th>
              <th>Motivo</th>
            </tr>
          </thead>
          <tbody>
            @for (record of records(); track record.id) {
              <tr class="table-row">
                <td>{{ record.fecha }}</td>
                <td>{{ record.edad }} días</td>
                <td>{{ record.nombreMedicamento }}</td>
                <td>{{ record.dosis }}</td>
                <td>{{ record.duracion }} días</td>
                <td>{{ record.motivo }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <app-modal
        [isOpen]="showAddModal()"
        title="Nuevo Registro de Medicación"
        (closeModal)="closeAddModal()"
      >
        <div class="modal-form">
          <div class="form-group">
            <label>Fecha de Registro</label>
            <input type="date" [(ngModel)]="formData.fecha" />
          </div>

          <div class="form-group">
            <label>Edad del Pollo (días)</label>
            <input type="number" [(ngModel)]="formData.edad" />
          </div>

          <div class="form-group">
            <label>Nombre del Medicamento</label>
            <input type="text" [(ngModel)]="formData.nombreMedicamento" />
          </div>

          <div class="form-group">
            <label>Dosis</label>
            <input type="text" [(ngModel)]="formData.dosis" placeholder="Ej: 50ml/100L" />
          </div>

          <div class="form-group">
            <label>Duración (días)</label>
            <input type="number" [(ngModel)]="formData.duracion" />
          </div>

          <div class="form-group">
            <label>Motivo de Aplicación</label>
            <input type="text" [(ngModel)]="formData.motivo" />
          </div>

          <div class="form-actions">
            <app-button variant="primary" (click)="saveRecord()">
              Guardar
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

    .form-group input:focus {
      outline: none;
      border-color: #357266;
      box-shadow: 0 0 0 3px rgba(53, 114, 102, 0.1);
    }

    .form-actions {
      display: flex;
      gap: 12px;
      margin-top: 16px;
      justify-content: flex-end;
    }
  `],
  host: {
    class: 'medication-component'
  }
})
export class MedicationComponent {
  records = signal<MedicationRecord[]>([
    {
      id: 1,
      fecha: '2026-05-15',
      edad: 18,
      nombreMedicamento: 'Amoxicilina',
      dosis: '50ml/100L',
      duracion: 3,
      motivo: 'Infección respiratoria'
    },
    {
      id: 2,
      fecha: '2026-05-12',
      edad: 15,
      nombreMedicamento: 'Vitaminas + Electrolitos',
      dosis: '100ml/100L',
      duracion: 2,
      motivo: 'Fortalecimiento inmunológico'
    }
  ]);

  showAddModal = signal(false);
  formData = {
    fecha: '',
    edad: 0,
    nombreMedicamento: '',
    dosis: '',
    duracion: 0,
    motivo: ''
  };

  openAddModal() {
    const today = new Date();
    this.formData = {
      fecha: today.toISOString().split('T')[0],
      edad: 0,
      nombreMedicamento: '',
      dosis: '',
      duracion: 0,
      motivo: ''
    };
    this.showAddModal.set(true);
  }

  closeAddModal() {
    this.showAddModal.set(false);
  }

  saveRecord() {
    const newRecord: MedicationRecord = {
      id: this.records().length + 1,
      fecha: this.formData.fecha,
      edad: this.formData.edad,
      nombreMedicamento: this.formData.nombreMedicamento,
      dosis: this.formData.dosis,
      duracion: this.formData.duracion,
      motivo: this.formData.motivo
    };

    this.records.update(r => [newRecord, ...r]);
    this.closeAddModal();
  }
}
