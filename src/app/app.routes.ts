import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard.component';
import { VentilationComponent } from './pages/ventilation.component';
import { BroodersComponent } from './pages/brooders.component';
import { PumpsComponent } from './pages/pumps.component';
import { MortalityComponent } from './pages/mortality.component';
import { ConsumptionComponent } from './pages/consumption.component';
import { WeightComponent } from './pages/weight.component';
import { MedicationComponent } from './pages/medication.component';
import { ReportsComponent } from './pages/reports.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'ventilacion', component: VentilationComponent },
      { path: 'criadoras', component: BroodersComponent },
      { path: 'bombas', component: PumpsComponent },
      { path: 'mortalidad', component: MortalityComponent },
      { path: 'consumo', component: ConsumptionComponent },
      { path: 'peso', component: WeightComponent },
      { path: 'medicacion', component: MedicationComponent },
      { path: 'reportes', component: ReportsComponent }
    ]
  }
];
