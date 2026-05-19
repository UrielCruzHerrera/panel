import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../shared/components/card.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <div class="dashboard-container">
      <div class="dashboard-grid">
        <app-card
          title="Temperatura"
          value="28.5"
          unit="°C"
        ></app-card>

        <app-card
          title="Humedad"
          value="65"
          unit="%"
        ></app-card>

        <app-card
          title="Amoniaco"
          value="12"
          unit="ppm"
        ></app-card>

        <app-card
          title="Edad de la Parvada"
          value="25"
          unit="días"
        ></app-card>

        <app-card
          title="Aves Vivas"
          value="1,250"
          unit="unidades"
        ></app-card>

        <app-card
          title="Peso Actual"
          value="1.85"
          unit="kg"
        ></app-card>
      </div>

      <div class="dashboard-section">
        <h2>Equipos Activos</h2>
        <div class="equipment-grid">
          <div class="equipment-card">
            <h3>Ventiladores</h3>
            <p class="equipment-value">4/4</p>
            <p class="equipment-status" [class.active]="true">Activos</p>
          </div>
          <div class="equipment-card">
            <h3>Criadoras</h3>
            <p class="equipment-value">3/3</p>
            <p class="equipment-status" [class.active]="true">Activas</p>
          </div>
          <div class="equipment-card">
            <h3>Bombas</h3>
            <p class="equipment-value">2/2</p>
            <p class="equipment-status" [class.active]="true">Activas</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      max-width: 1200px;
    }

    .dashboard-title {
      margin: 0 0 24px 0;
      font-size: 28px;
      font-weight: 600;
      color: #001d4a;
      letter-spacing: 0.3px;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-bottom: 40px;
    }

    .dashboard-section {
      margin-top: 40px;
    }

    .dashboard-section h2 {
      margin: 0 0 20px 0;
      font-size: 18px;
      font-weight: 600;
      color: #001d4a;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .equipment-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }

    .equipment-card {
      background: white;
      border-radius: 12px;
      padding: 20px;
      border: 2px solid #f0f0f0;
      transition: all 0.3s ease;
      text-align: center;
    }

    .equipment-card:hover {
      border-color: #357266;
      box-shadow: 0 4px 12px rgba(53, 114, 102, 0.15);
    }

    .equipment-card h3 {
      margin: 0;
      font-size: 16px;
      color: #666;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }

    .equipment-value {
      margin: 12px 0 8px 0;
      font-size: 28px;
      font-weight: 700;
      color: #001d4a;
    }

    .equipment-status {
      margin: 0;
      font-size: 13px;
      color: #d32f2f;
      font-weight: 600;
    }

    .equipment-status.active {
      color: #357266;
    }

    @media (max-width: 768px) {
      .dashboard-grid {
        grid-template-columns: 1fr;
      }

      .equipment-grid {
        grid-template-columns: 1fr;
      }

      .dashboard-title {
        font-size: 22px;
      }
    }
  `],
  host: {
    class: 'dashboard-component'
  }
})
export class DashboardComponent {}
