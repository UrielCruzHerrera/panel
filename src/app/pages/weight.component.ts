import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../shared/components/button.component';
import { ModalComponent } from '../shared/components/modal.component';
import { WeightRecord } from '../shared/models';

@Component({
  selector: 'app-weight',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent, ModalComponent],
  template: `
    <div class="page-container">
      <div class="page-header">
        <p class="page-description">Seguimiento de peso promedio de la parvada</p>
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
              <th>Aves Muestreadas</th>
              <th>Peso Promedio (kg)</th>
              <th>Sexo</th>
              <th>Zona</th>
            </tr>
          </thead>
          <tbody>
            @for (record of records(); track record.id) {
              <tr class="table-row">
                <td>{{ record.fecha }}</td>
                <td>{{ record.edad }} días</td>
                <td>{{ record.avesMuestreadas }}</td>
                <td>{{ record.pesoPromedio }}</td>
                <td>{{ record.sexo }}</td>
                <td>{{ record.zona }}</td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <app-modal
        [isOpen]="showAddModal()"
        title="Nuevo Registro de Peso"
        (closeModal)="closeAddModal()"
      >
        <div class="modal-form">
          <div class="form-group">
            <label>Fecha de Registro</label>
            <input type="date" [(ngModel)]="formData.fecha" />
          </div>

          <div class="form-group">
            <label>Edad (días)</label>
            <input type="number" [(ngModel)]="formData.edad" />
          </div>

          <div class="form-group">
            <label>Aves de Muestra</label>
            <input type="number" [(ngModel)]="formData.avesMuestreadas" />
          </div>

          <div class="form-group">
            <label>Peso Promedio (kg)</label>
            <input type="number" step="0.01" [(ngModel)]="formData.pesoPromedio" />
          </div>

          <div class="form-group">
            <label>Sexo Evaluado</label>
            <select [(ngModel)]="formData.sexo">
              <option value="Hembra">Hembra</option>
              <option value="Macho">Macho</option>
              <option value="Mixto">Mixto</option>
            </select>
          </div>

          <div class="form-group">
            <label>Zona</label>
            <select [(ngModel)]="formData.zona">
              <option value="Panel">Panel</option>
              <option value="Medio">Medio</option>
              <option value="Extractores">Extractores</option>
            </select>
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

    .form-group input,
    .form-group select {
      padding: 10px 12px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 14px;
      transition: border-color 0.2s ease;
      font-family: inherit;
    }

    .form-group input:focus,
    .form-group select:focus {
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
    class: 'weight-component'
  }
})
export class WeightComponent {
  records = signal<WeightRecord[]>([
    {
      id: 1,
      fecha: '2026-05-15',
      edad: 20,
      avesMuestreadas: 50,
      pesoPromedio: 1.8,
      sexo: 'Mixto',
      zona: 'Panel'
    },
    {
      id: 2,
      fecha: '2026-05-16',
      edad: 21,
      avesMuestreadas: 50,
      pesoPromedio: 1.85,
      sexo: 'Mixto',
      zona: 'Medio'
    }
  ]);

  showAddModal = signal(false);
  formData = {
    fecha: '',
    edad: 0,
    avesMuestreadas: 0,
    pesoPromedio: 0,
    sexo: 'Mixto' as 'Hembra' | 'Macho' | 'Mixto',
    zona: 'Panel' as 'Panel' | 'Medio' | 'Extractores'
  };

  openAddModal() {
    const today = new Date();
    this.formData = {
      fecha: today.toISOString().split('T')[0],
      edad: 0,
      avesMuestreadas: 0,
      pesoPromedio: 0,
      sexo: 'Mixto',
      zona: 'Panel'
    };
    this.showAddModal.set(true);
  }

  closeAddModal() {
    this.showAddModal.set(false);
  }

  saveRecord() {
    const newRecord: WeightRecord = {
      id: this.records().length + 1,
      fecha: this.formData.fecha,
      edad: this.formData.edad,
      avesMuestreadas: this.formData.avesMuestreadas,
      pesoPromedio: this.formData.pesoPromedio,
      sexo: this.formData.sexo,
      zona: this.formData.zona
    };

    this.records.update(r => [newRecord, ...r]);
    this.closeAddModal();
  }
}
