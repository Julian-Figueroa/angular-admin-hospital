import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { PAGES_ROUTES } from "./pages.routes";
import { SharedModule } from "../shared/shared.module";

import { ChartsModule } from 'ng2-charts/ng2-charts';

import { PagesComponent } from "./pages.component";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graph1Component } from "./graph1/graph1.component";

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graph1Component
  ],
  exports: [DashboardComponent, ProgressComponent, Graph1Component],
  imports: [SharedModule, PAGES_ROUTES, FormsModule, ChartsModule]
})
export class PagesModule {}
