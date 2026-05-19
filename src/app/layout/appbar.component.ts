import { Component, input, signal, effect, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-appbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="appbar">
      <div class="appbar-content">
        <div class="appbar-title">
          <h1 class="page-title">{{ title() }}</h1>
        </div>

        <div class="appbar-info">
          <div class="info-item">
            <span class="info-icon">📅</span>
            <span class="info-text">{{ currentDate() }}</span>
          </div>
          <div class="info-item">
            <span class="info-icon">🕐</span>
            <span class="info-text">{{ currentTime() }}</span>
          </div>
          <div class="info-item day-indicator">
            <span class="day-badge">Día {{ flockAge() }}</span>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .appbar {
      background: white;
      border-bottom: 1px solid #e0e0e0;
      padding: 16px 24px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      position: sticky;
      top: 0;
      z-index: 50;
    }

    .appbar-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 100%;
    }

    .appbar-title {
      flex: 1;
    }

    .page-title {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
      color: #001d4a;
      letter-spacing: 0.3px;
    }

    .appbar-info {
      display: flex;
      align-items: center;
      gap: 24px;
    }

    .info-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: #666;
    }

    .info-icon {
      font-size: 18px;
    }

    .info-text {
      font-weight: 500;
    }

    .day-indicator {
      margin-left: 12px;
      padding-left: 12px;
      border-left: 2px solid #e0e0e0;
    }

    .day-badge {
      background-color: #357266;
      color: white;
      padding: 6px 12px;
      border-radius: 20px;
      font-weight: 600;
      font-size: 13px;
      letter-spacing: 0.3px;
    }

    @media (max-width: 768px) {
      .appbar {
        padding: 12px 16px;
      }

      .appbar-info {
        gap: 12px;
      }

      .day-indicator {
        margin-left: 8px;
        padding-left: 8px;
      }

      .info-item {
        font-size: 12px;
      }

      .page-title {
        font-size: 18px;
      }
    }
  `],
  host: {
    class: 'appbar-component'
  }
})
export class AppbarComponent implements OnInit {
  title = input('Dashboard');
  flockAge = input(25);

  currentDate = signal('');
  currentTime = signal('');

  ngOnInit() {
    this.updateDateTime();
    setInterval(() => this.updateDateTime(), 1000);
  }

  private updateDateTime() {
    const now = new Date();
    const dateFormatter = new Intl.DateTimeFormat('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const timeFormatter = new Intl.DateTimeFormat('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    this.currentDate.set(dateFormatter.format(now));
    this.currentTime.set(timeFormatter.format(now));
  }
}
