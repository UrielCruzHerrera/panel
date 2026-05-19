import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { AppbarComponent } from './appbar.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [SidebarComponent, AppbarComponent, RouterOutlet],
  template: `
    <div class="layout-container">
      <app-sidebar></app-sidebar>
      <div class="main-content">
        <app-appbar [title]="currentPageTitle()"></app-appbar>
        <main class="page-content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .layout-container {
      display: flex;
      height: 100vh;
      background-color: #f8f9fa;
    }

    .main-content {
      flex: 1;
      margin-left: 260px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .page-content {
      flex: 1;
      overflow-y: auto;
      padding: 24px;
    }

    @media (max-width: 768px) {
      .layout-container {
        flex-direction: column;
        height: auto;
      }

      .main-content {
        margin-left: 0;
      }
    }
  `],
  host: {
    class: 'main-layout-component'
  }
})
export class MainLayoutComponent implements OnInit {
  currentPageTitle = signal('Dashboard');

  private titleMap: { [key: string]: string } = {
    '/dashboard': 'Dashboard',
    '/ventilacion': 'Gestión de Ventiladores',
    '/criadoras': 'Gestión de Criadoras',
    '/bombas': 'Gestión de Bombas',
    '/mortalidad': 'Registro de Mortalidad',
    '/consumo': 'Consumo Diario',
    '/peso': 'Registro de Peso',
    '/medicacion': 'Medicación',
    '/reportes': 'Reportes'
  };

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = event.urlAfterRedirects;
        this.currentPageTitle.set(this.titleMap[url] || 'Dashboard');
      });

    // Set initial title
    const currentUrl = this.router.url;
    this.currentPageTitle.set(this.titleMap[currentUrl] || 'Dashboard');
  }
}
