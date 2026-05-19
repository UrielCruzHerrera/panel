import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonVariant = 'primary' | 'secondary' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [class.btn-primary]="variant() === 'primary'"
      [class.btn-secondary]="variant() === 'secondary'"
      [class.btn-danger]="variant() === 'danger'"
      [class.btn-small]="size() === 'small'"
      [class.btn-medium]="size() === 'medium'"
      [class.btn-large]="size() === 'large'"
      [disabled]="disabled()"
      class="btn"
    >
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    .btn {
      padding: 8px 16px;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.3s ease;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn-primary {
      background-color: #357266;
      color: white;
    }

    .btn-primary:not(:disabled):hover {
      background-color: #2a5a52;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(53, 114, 102, 0.3);
    }

    .btn-secondary {
      background-color: #f3fcf0;
      color: #001d4a;
      border: 2px solid #357266;
    }

    .btn-secondary:not(:disabled):hover {
      background-color: #e8f5e3;
    }

    .btn-danger {
      background-color: #d32f2f;
      color: white;
    }

    .btn-danger:not(:disabled):hover {
      background-color: #b71c1c;
    }

    .btn-small {
      padding: 6px 12px;
      font-size: 12px;
    }

    .btn-medium {
      padding: 8px 16px;
      font-size: 14px;
    }

    .btn-large {
      padding: 10px 20px;
      font-size: 16px;
    }
  `],
  host: {
    class: 'button-wrapper'
  }
})
export class ButtonComponent {
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('medium');
  disabled = input(false);
}
