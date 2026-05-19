import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ReportData {
  type: string;
  startDate: string;
  endDate: string;
}

interface SummaryCard {
  label: string;
  value: string;
  unit: string;
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="reports-container">
      <div class="reports-header">
        <h1 class="reports-title">Reportes</h1>
        <p class="reports-subtitle">Consulta y preparación de reportes de la parvada y del ambiente del galpón.</p>
      </div>

      <div class="reports-content">
        <!-- Tarjeta de Filtros -->
        <div class="filter-card">
          <h2 class="filter-title">Filtros de Reporte</h2>
          
          <div class="filter-grid">
            <div class="filter-item">
              <label for="report-type">Tipo de reporte:</label>
              <select 
                id="report-type" 
                [value]="selectedReportType()"
                (change)="onSelectedReportTypeChange($any($event.target).value)"
                class="filter-select"
              >
                <option value="">Seleccionar tipo...</option>
                <option value="general">Reporte general de parvada</option>
                <option value="ambiental">Reporte ambiental</option>
                <option value="mortalidad">Reporte de mortalidad</option>
                <option value="consumo">Reporte de consumo</option>
                <option value="peso">Reporte de peso</option>
                <option value="medicacion">Reporte de medicación</option>
              </select>
            </div>

            <div class="filter-item">
              <label for="start-date">Fecha inicial:</label>
              <input 
                type="date" 
                id="start-date" 
                [value]="startDate()"
                (change)="onStartDateChange($any($event.target).value)"
                class="filter-input"
              />
            </div>

            <div class="filter-item">
              <label for="end-date">Fecha final:</label>
              <input 
                type="date" 
                id="end-date" 
                [value]="endDate()"
                (change)="onEndDateChange($any($event.target).value)"
                class="filter-input"
              />
            </div>
          </div>

          <div class="filter-actions">
            <button class="btn btn-primary" (click)="generateReport()">Generar reporte</button>
            <button class="btn btn-secondary" (click)="clearFilters()">Limpiar filtros</button>
            <button class="btn btn-success" (click)="exportPDF()">Exportar PDF</button>
          </div>
        </div>

        <!-- Tarjetas de Resumen -->
        <div class="summary-cards" *ngIf="selectedReportType()">
          <div class="summary-card" *ngFor="let card of summaryCards()">
            <h3 class="card-label">{{ card.label }}</h3>
            <p class="card-value">{{ card.value }}</p>
            <p class="card-unit" *ngIf="card.unit">{{ card.unit }}</p>
          </div>
        </div>

        <!-- Tabla de Resultados -->
        <div class="results-section" *ngIf="selectedReportType()">
          <h2 class="results-title">Datos del Reporte</h2>
          <div class="table-wrapper">
            <table class="results-table">
              <thead>
                <tr>
                  <th *ngFor="let column of currentColumns()">{{ column }}</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let row of currentTableData()">
                  <td *ngFor="let column of currentColumns()">{{ row[column.toLowerCase().replace(/\s+/g, '_')] }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Vista Previa del Reporte -->
        <div class="preview-section" *ngIf="selectedReportType()">
          <h2 class="preview-title">Vista Previa del Reporte</h2>
          <div class="preview-document">
            <div class="preview-header">
              <h3>{{ getReportTitle() }}</h3>
              <p class="preview-date">Período: {{ startDate() }} a {{ endDate() }}</p>
              <p class="preview-generated">Generado: {{ getCurrentDate() }}</p>
            </div>

            <div class="preview-content">
              <p class="preview-intro">Este reporte presenta un resumen de la información registrada durante el periodo seleccionado, considerando indicadores productivos, ambientales y sanitarios de la parvada.</p>

              <div class="preview-indicators">
                <h4>Indicadores Principales:</h4>
                <ul>
                  <li *ngFor="let indicator of getPreviewIndicators()">{{ indicator }}</li>
                </ul>
              </div>

              <div class="preview-conclusion">
                <p>El estado general de la parvada muestra un desempeño dentro de los parámetros esperados. Se recomienda continuar con el monitoreo regular y aplicar las medidas de manejo establecidas.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .reports-container {
      padding: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .reports-header {
      margin-bottom: 32px;
    }

    .reports-title {
      font-size: 32px;
      font-weight: 600;
      color: #001d4a;
      margin: 0 0 8px 0;
    }

    .reports-subtitle {
      font-size: 16px;
      color: #666;
      margin: 0;
    }

    .reports-content {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }

    /* Filter Card */
    .filter-card {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    .filter-title {
      font-size: 18px;
      font-weight: 600;
      color: #001d4a;
      margin: 0 0 20px 0;
    }

    .filter-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
      margin-bottom: 20px;
    }

    .filter-item {
      display: flex;
      flex-direction: column;
    }

    .filter-item label {
      font-size: 14px;
      font-weight: 500;
      color: #333;
      margin-bottom: 8px;
    }

    .filter-select,
    .filter-input {
      padding: 10px 12px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 14px;
      font-family: inherit;
      transition: border-color 0.2s;
    }

    .filter-select:focus,
    .filter-input:focus {
      outline: none;
      border-color: #357266;
      box-shadow: 0 0 0 3px rgba(53, 114, 102, 0.1);
    }

    .filter-actions {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }

    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }

    .btn-primary {
      background-color: #357266;
      color: white;
    }

    .btn-primary:hover {
      background-color: #2a5a52;
    }

    .btn-secondary {
      background-color: #f0f0f0;
      color: #333;
    }

    .btn-secondary:hover {
      background-color: #e0e0e0;
    }

    .btn-success {
      background-color: #357266;
      color: white;
    }

    .btn-success:hover {
      background-color: #2a5a52;
    }

    /* Summary Cards */
    .summary-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 16px;
    }

    .summary-card {
      background: white;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      text-align: center;
    }

    .card-label {
      font-size: 14px;
      color: #666;
      margin: 0 0 12px 0;
      font-weight: 500;
    }

    .card-value {
      font-size: 28px;
      font-weight: 600;
      color: #357266;
      margin: 0;
    }

    .card-unit {
      font-size: 12px;
      color: #999;
      margin: 4px 0 0 0;
    }

    /* Results Section */
    .results-section {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    .results-title {
      font-size: 18px;
      font-weight: 600;
      color: #001d4a;
      margin: 0 0 20px 0;
    }

    .table-wrapper {
      overflow-x: auto;
    }

    .results-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 14px;
    }

    .results-table thead {
      background-color: #f5f5f5;
    }

    .results-table th {
      padding: 12px;
      text-align: left;
      font-weight: 600;
      color: #001d4a;
      border-bottom: 2px solid #ddd;
    }

    .results-table td {
      padding: 12px;
      border-bottom: 1px solid #eee;
      color: #333;
    }

    .results-table tbody tr:hover {
      background-color: #f9f9f9;
    }

    /* Preview Section */
    .preview-section {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    .preview-title {
      font-size: 18px;
      font-weight: 600;
      color: #001d4a;
      margin: 0 0 20px 0;
    }

    .preview-document {
      background-color: #f9f9f9;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 24px;
      font-size: 14px;
      line-height: 1.6;
    }

    .preview-header {
      margin-bottom: 20px;
      padding-bottom: 16px;
      border-bottom: 2px solid #ddd;
    }

    .preview-header h3 {
      font-size: 18px;
      font-weight: 600;
      color: #001d4a;
      margin: 0 0 8px 0;
    }

    .preview-date,
    .preview-generated {
      margin: 4px 0;
      color: #666;
      font-size: 13px;
    }

    .preview-intro {
      color: #555;
      margin: 16px 0;
      font-style: italic;
    }

    .preview-indicators {
      margin: 20px 0;
    }

    .preview-indicators h4 {
      font-size: 14px;
      font-weight: 600;
      color: #001d4a;
      margin: 0 0 12px 0;
    }

    .preview-indicators ul {
      margin: 0;
      padding-left: 20px;
      list-style: disc;
    }

    .preview-indicators li {
      margin: 8px 0;
      color: #555;
    }

    .preview-conclusion {
      margin-top: 20px;
      padding-top: 16px;
      border-top: 1px solid #ddd;
      color: #555;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .reports-container {
        padding: 16px;
      }

      .filter-grid {
        grid-template-columns: 1fr;
      }

      .summary-cards {
        grid-template-columns: repeat(2, 1fr);
      }

      .reports-title {
        font-size: 24px;
      }
    }
  `]
})
export class ReportsComponent {
  selectedReportType = signal<string>('');
  startDate = signal<string>('2026-05-01');
  endDate = signal<string>('2026-05-18');

  onSelectedReportTypeChange(value: string) {
    this.selectedReportType.set(value);
    this.onReportTypeChange();
  }

  onStartDateChange(value: string) {
    this.startDate.set(value);
  }

  onEndDateChange(value: string) {
    this.endDate.set(value);
  }

  // Data for different report types
  private reportDataMap = {
    general: {
      summary: [
        { label: 'Día de la parvada', value: '25', unit: 'días' },
        { label: 'Aves vivas', value: '1,250', unit: 'unidades' },
        { label: 'Mortalidad acumulada', value: '35', unit: 'aves' },
        { label: 'Consumo total', value: '480', unit: 'kg' }
      ],
      columns: ['Indicador', 'Valor', 'Estado', 'Observación'],
      data: [
        { indicador: 'Edad actual', valor: '25 días', estado: 'Normal', observacion: 'Según programa' },
        { indicador: 'Mortalidad acumulada', valor: '2.8%', estado: 'Bueno', observacion: 'Dentro de límites' },
        { indicador: 'Consumo acumulado', valor: '480 kg', estado: 'Normal', observacion: 'Promedio esperado' },
        { indicador: 'Peso promedio', valor: '1.85 kg', estado: 'Bueno', observacion: 'Conforme a estándar' }
      ]
    },
    ambiental: {
      summary: [
        { label: 'Temperatura promedio', value: '28.5', unit: '°C' },
        { label: 'Humedad promedio', value: '65', unit: '%' },
        { label: 'Amoniaco promedio', value: '12', unit: 'ppm' },
        { label: 'Registros tomados', value: '72', unit: 'mediciones' }
      ],
      columns: ['Fecha', 'Temperatura', 'Humedad', 'Amoniaco', 'Estado'],
      data: [
        { fecha: '2026-05-18', temperatura: '28.5°C', humedad: '65%', amoniaco: '12 ppm', estado: 'Normal' },
        { fecha: '2026-05-17', temperatura: '28.3°C', humedad: '64%', amoniaco: '11 ppm', estado: 'Normal' },
        { fecha: '2026-05-16', temperatura: '28.7°C', humedad: '66%', amoniaco: '13 ppm', estado: 'Normal' },
        { fecha: '2026-05-15', temperatura: '28.2°C', humedad: '63%', amoniaco: '10 ppm', estado: 'Normal' }
      ]
    },
    mortalidad: {
      summary: [
        { label: 'Mortalidad acumulada', value: '35', unit: 'aves' },
        { label: 'Tasa de mortalidad', value: '2.8', unit: '%' },
        { label: 'Registros de mortalidad', value: '8', unit: 'eventos' },
        { label: 'Causa principal', value: 'Asfixia', unit: '' }
      ],
      columns: ['Fecha', 'Edad', 'Machos', 'Hembras', 'Total', 'Observaciones'],
      data: [
        { fecha: '2026-05-18', edad: '25 días', machos: '2', hembras: '1', total: '3', observaciones: 'Asfixia nocturna' },
        { fecha: '2026-05-17', edad: '24 días', machos: '1', hembras: '2', total: '3', observaciones: 'Debilidad general' },
        { fecha: '2026-05-16', edad: '23 días', machos: '3', hembras: '2', total: '5', observaciones: 'Accidente de manejo' },
        { fecha: '2026-05-15', edad: '22 días', machos: '2', hembras: '1', total: '3', observaciones: 'Enfermedad respiratoria' }
      ]
    },
    consumo: {
      summary: [
        { label: 'Consumo total', value: '480', unit: 'kg' },
        { label: 'Consumo promedio', value: '384', unit: 'g/ave' },
        { label: 'Registros de consumo', value: '18', unit: 'mediciones' },
        { label: 'Consumo diario estimado', value: '19.2', unit: 'kg/día' }
      ],
      columns: ['Fecha', 'Edad del pollo', 'Consumo total', 'Consumo por ave'],
      data: [
        { fecha: '2026-05-18', edad_del_pollo: '25 días', consumo_total: '19.2 kg', consumo_por_ave: '15.4 g' },
        { fecha: '2026-05-17', edad_del_pollo: '24 días', consumo_total: '18.8 kg', consumo_por_ave: '15.0 g' },
        { fecha: '2026-05-16', edad_del_pollo: '23 días', consumo_total: '18.5 kg', consumo_por_ave: '14.8 g' },
        { fecha: '2026-05-15', edad_del_pollo: '22 días', consumo_total: '18.2 kg', consumo_por_ave: '14.6 g' }
      ]
    },
    peso: {
      summary: [
        { label: 'Peso promedio', value: '1.85', unit: 'kg' },
        { label: 'Aves muestreadas', value: '125', unit: 'unidades' },
        { label: 'Registros de peso', value: '12', unit: 'mediciones' },
        { label: 'Ganancia diaria', value: '74.2', unit: 'g/día' }
      ],
      columns: ['Fecha', 'Edad', 'Aves muestreadas', 'Peso promedio', 'Sexo', 'Zona'],
      data: [
        { fecha: '2026-05-18', edad: '25 días', aves_muestreadas: '125', peso_promedio: '1.85 kg', sexo: 'Mixto', zona: 'Panel' },
        { fecha: '2026-05-17', edad: '24 días', aves_muestreadas: '125', peso_promedio: '1.77 kg', sexo: 'Mixto', zona: 'Medio' },
        { fecha: '2026-05-16', edad: '23 días', aves_muestreadas: '125', peso_promedio: '1.70 kg', sexo: 'Mixto', zona: 'Extractores' },
        { fecha: '2026-05-15', edad: '22 días', aves_muestreadas: '125', peso_promedio: '1.62 kg', sexo: 'Mixto', zona: 'Panel' }
      ]
    },
    medicacion: {
      summary: [
        { label: 'Medicaciones aplicadas', value: '3', unit: 'tipos' },
        { label: 'Dosis totales', value: '12', unit: 'aplicaciones' },
        { label: 'Registros de medicación', value: '6', unit: 'eventos' },
        { label: 'Medicamento más usado', value: 'Antibiótico A', unit: '' }
      ],
      columns: ['Fecha', 'Edad', 'Medicamento', 'Dosis', 'Duración', 'Motivo'],
      data: [
        { fecha: '2026-05-18', edad: '25 días', medicamento: 'Probiótico', dosis: '1 g/L', duracion: '3 días', motivo: 'Prevención' },
        { fecha: '2026-05-16', edad: '23 días', medicamento: 'Antibiótico A', dosis: '0.5 g/L', duracion: '5 días', motivo: 'Infección respiratoria' },
        { fecha: '2026-05-14', edad: '21 días', medicamento: 'Vitamínico', dosis: '2 mL/L', duracion: '2 días', motivo: 'Recuperación post-vacuna' },
        { fecha: '2026-05-12', edad: '19 días', medicamento: 'Antiparasitario', dosis: '0.3 g/L', duracion: '1 día', motivo: 'Control preventivo' }
      ]
    }
  };

  summaryCards = signal<SummaryCard[]>([]);
  currentColumns = signal<string[]>([]);
  currentTableData = signal<any[]>([]);

  onReportTypeChange() {
    if (this.selectedReportType()) {
      this.generateReport();
    }
  }

  generateReport() {
    const reportType = this.selectedReportType();
    if (reportType && this.reportDataMap[reportType as keyof typeof this.reportDataMap]) {
      const report = this.reportDataMap[reportType as keyof typeof this.reportDataMap];
      this.summaryCards.set(report.summary);
      this.currentColumns.set(report.columns);
      this.currentTableData.set(report.data);
    }
  }

  clearFilters() {
    this.selectedReportType.set('');
    this.startDate.set('2026-05-01');
    this.endDate.set('2026-05-18');
    this.summaryCards.set([]);
    this.currentColumns.set([]);
    this.currentTableData.set([]);
  }

  exportPDF() {
    alert('Exportación a PDF simulada. En una aplicación real, esto generaría un archivo PDF.');
  }

  getReportTitle(): string {
    const titles: { [key: string]: string } = {
      general: 'Reporte General de Parvada',
      ambiental: 'Reporte Ambiental',
      mortalidad: 'Reporte de Mortalidad',
      consumo: 'Reporte de Consumo',
      peso: 'Reporte de Peso',
      medicacion: 'Reporte de Medicación'
    };
    return titles[this.selectedReportType()] || 'Reporte';
  }

  getCurrentDate(): string {
    const today = new Date();
    return today.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  getPreviewIndicators(): string[] {
    const indicators: { [key: string]: string[] } = {
      general: [
        'Edad actual de 25 días según programa',
        'Mortalidad acumulada de 2.8% dentro de límites',
        'Consumo acumulado de 480 kg conforme a estándar',
        'Peso promedio de 1.85 kg dentro de especificaciones'
      ],
      ambiental: [
        'Temperatura promedio de 28.5°C',
        'Humedad relativa de 65%',
        'Concentración de amoniaco de 12 ppm',
        'Condiciones ambientales dentro de parámetros'
      ],
      mortalidad: [
        'Mortalidad acumulada de 35 aves (2.8%)',
        'Principales causas: asfixia nocturna y debilidad general',
        'Distribución entre sexos: más machos afectados',
        'Tendencia controlada dentro de límites aceptables'
      ],
      consumo: [
        'Consumo total de 480 kg en 25 días',
        'Promedio de 384 g/ave acumulado',
        'Consumo diario estimado de 19.2 kg',
        'Patrón de consumo conforme a edad'
      ],
      peso: [
        'Peso promedio de 1.85 kg en día 25',
        'Ganancia diaria de 74.2 g por ave',
        'Uniformidad adecuada en el lote',
        'Distribución equitativa por zonas del galpón'
      ],
      medicacion: [
        'Tres tipos de medicamentos aplicados',
        'Doce aplicaciones totales en el período',
        'Principalmente preventiva y de soporte',
        'Control de salud del lote dentro de protocolos'
      ]
    };
    return indicators[this.selectedReportType()] || [];
  }
}
