import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card">
      <div class="card-icon">
        <ng-content select="[card-icon]"></ng-content>
      </div>
      <div class="card-content">
        <h3 class="card-title">{{ title() }}</h3>
        <p class="card-value">{{ value() }}</p>
        <p class="card-unit">{{ unit() }}</p>
      </div>
    </div>
  `,
  styles: [`
    .card {
      background: white;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      gap: 20px;
      transition: all 0.3s ease;
      border: 1px solid #e0e0e0;
    }

    .card:hover {
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
      transform: translateY(-2px);
    }

    .card-icon {
      font-size: 32px;
      min-width: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #357266;
    }

    .card-content {
      flex: 1;
    }

    .card-title {
      margin: 0;
      font-size: 14px;
      color: #666;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .card-value {
      margin: 8px 0 0 0;
      font-size: 28px;
      font-weight: 700;
      color: #001d4a;
    }

    .card-unit {
      margin: 4px 0 0 0;
      font-size: 12px;
      color: #999;
      font-weight: 500;
    }
  `],
  host: {
    class: 'card-wrapper'
  }
})
export class CardComponent {
  title = input('');
  value = input('');
  unit = input('');
}
