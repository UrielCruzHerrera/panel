import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="table-wrapper">
      <table class="table">
        <thead>
          <tr>
            <th class="th-checkbox">
              <input
                type="checkbox"
                class="checkbox"
                [checked]="isAllSelected()"
                (change)="toggleAll($event)"
                aria-label="Seleccionar todo"
              />
            </th>
            @for (column of columns(); track column) {
              <th>{{ column }}</th>
            }
          </tr>
        </thead>
        <tbody>
          @for (row of data(); track row.id) {
            <tr
              [class.selected]="isSelected(row.id)"
              (click)="selectRow(row.id)"
              class="table-row"
            >
              <td class="td-checkbox">
                <input
                  type="checkbox"
                  class="checkbox"
                  [checked]="isSelected(row.id)"
                  (change)="toggleRow(row.id, $event)"
                  (click)="$event.stopPropagation()"
                  aria-label="Seleccionar fila"
                />
              </td>
              <ng-container
                *ngTemplateOutlet="rowTemplate(); context: { $implicit: row }"
              ></ng-container>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .table-wrapper {
      overflow-x: auto;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
    }

    .table {
      width: 100%;
      border-collapse: collapse;
      background: white;
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
  `],
  host: {
    class: 'table-wrapper-component'
  }
})
export class TableComponent {
  columns = input<string[]>([]);
  data = input<any[]>([]);
  rowTemplate = input<any>(null);
  selectedIds = input<Set<number>>(new Set());
  selectionChange = output<number>();
  selectAll = output<boolean>();

  isSelected(id: number): boolean {
    return this.selectedIds().has(id);
  }

  isAllSelected(): boolean {
    const data = this.data();
    if (data.length === 0) return false;
    return data.every(row => this.isSelected(row.id));
  }

  selectRow(id: number) {
    this.selectionChange.emit(id);
  }

  toggleRow(id: number, event: any) {
    event.stopPropagation();
    this.selectionChange.emit(id);
  }

  toggleAll(event: any) {
    this.selectAll.emit(event.target.checked);
  }
}
