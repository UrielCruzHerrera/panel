import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { AppbarComponent } from './appbar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [SidebarComponent, AppbarComponent, RouterOutlet],
  template: `
    <div class="layout-container">
      <app-sidebar></app-sidebar>
      <div class="main-content">
        <app-appbar></app-appbar>
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
export class MainLayoutComponent {}
