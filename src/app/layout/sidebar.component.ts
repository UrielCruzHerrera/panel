import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="logo">
          <span class="logo-text">AviMax</span>
        </div>
      </div>

      <nav class="sidebar-nav">
        @for (item of menuItems(); track item.route) {
          <a
            [routerLink]="item.route"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: false }"
            class="nav-item"
          >
            <span class="nav-label">{{ item.label }}</span>
          </a>
        }
      </nav>

      <div class="sidebar-footer">
        <p class="footer-text">© 2026 AviMax</p>
      </div>
    </aside>
  `,
  styles: [`
    .sidebar {
      width: 260px;
      background-color: #001d4a;
      color: white;
      display: flex;
      flex-direction: column;
      height: 100vh;
      position: fixed;
      left: 0;
      top: 0;
      z-index: 100;
      box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);
    }

    .sidebar-header {
      padding: 24px 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 24px;
      font-weight: 700;
      color: white;
    }

    .logo-icon {
      font-size: 28px;
    }

    .logo-text {
      letter-spacing: 0.5px;
    }

    .sidebar-nav {
      flex: 1;
      padding: 16px 0;
      overflow-y: auto;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      transition: all 0.3s ease;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      margin: 0 8px;
      border-radius: 6px;
    }

    .nav-item:hover {
      background-color: rgba(53, 114, 102, 0.3);
      color: white;
    }

    .nav-item.active {
      background-color: #357266;
      color: white;
      box-shadow: 0 2px 8px rgba(53, 114, 102, 0.3);
    }

    .nav-icon {
      font-size: 20px;
      width: 24px;
      text-align: center;
      flex-shrink: 0;
    }

    .nav-label {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .sidebar-footer {
      padding: 16px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      text-align: center;
    }

    .footer-text {
      margin: 0;
      font-size: 12px;
      color: rgba(255, 255, 255, 0.5);
    }

    ::-webkit-scrollbar {
      width: 6px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 3px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  `],
  host: {
    class: 'sidebar-component'
  }
})
export class SidebarComponent {
  menuItems = input<MenuItem[]>([
    { label: 'Dashboard', icon: '', route: '/dashboard' },
    { label: 'Ventilación', icon: '', route: '/ventilacion' },
    { label: 'Criadoras', icon: '', route: '/criadoras' },
    { label: 'Bombas', icon: '', route: '/bombas' },
    { label: 'Mortalidad', icon: '', route: '/mortalidad' },
    { label: 'Consumo Diario', icon: '', route: '/consumo' },
    { label: 'Registro de Peso', icon: '', route: '/peso' },
    { label: 'Medicación', icon: '', route: '/medicacion' },
    { label: 'Reportes', icon: '', route: '/reportes' }
  ]);
}
