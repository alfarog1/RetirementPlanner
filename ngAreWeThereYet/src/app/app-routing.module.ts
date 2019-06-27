import { AdminComponent } from './components/admin/admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RiskQuestionnaireComponent } from './components/risk-questionnaire/risk-questionnaire.component';
import { FinanceBarComponent } from './components/finance-bar/finance-bar.component';
import { RetiregoalsComponent } from './components/retiregoals/retiregoals.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'questionnaire', component: RiskQuestionnaireComponent },
  { path: 'finbar', component: FinanceBarComponent },
  { path: 'admin', component: AdminComponent},
  { path: 'retireGoals', component: RetiregoalsComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})



export class AppRoutingModule { }
