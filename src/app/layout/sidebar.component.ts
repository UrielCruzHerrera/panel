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
          <img src="/avimax-icon-blue.png" alt="AviMax" class="logo-image">
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
      justify-content: center;
      gap: 10px;
      font-size: 24px;
      font-weight: 700;
      color: white;
    }

    .logo-image {
      height: 90px;
      width: auto;
      object-fit: contain;
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
      font-size: 17px;
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
      font-family: "Oswald", sans-serif;
      font-optical-sizing: auto;
      font-weight: 500;
      font-style: normal;
      letter-spacing: 0.5px;
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
    { label: 'DASHBOARD', icon: '', route: '/dashboard' },
    { label: 'VENTILACIÓN', icon: '', route: '/ventilacion' },
    { label: 'CRIADORAS', icon: '', route: '/criadoras' },
    { label: 'BOMBAS', icon: '', route: '/bombas' },
    { label: 'MORTALIDAD', icon: '', route: '/mortalidad' },
    { label: 'CONSUMO DIARIO', icon: '', route: '/consumo' },
    { label: 'REGISTRO DE PESO', icon: '', route: '/peso' },
    { label: 'MEDICACIÓN', icon: '', route: '/medicacion' },
    { label: 'REPORTES', icon: '', route: '/reportes' }
  ]);
}
