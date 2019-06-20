import { AuthenticationService } from './services/authentication.service';
import { AssetService } from "./services/asset.service";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";
import { HomeComponent } from "./components/home/home.component";
import { SignupComponent } from "./components/signup/signup.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { RiskQuestionnaireComponent } from "./components/risk-questionnaire/risk-questionnaire.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { MyLineChartComponent } from "./my-line-chart/my-line-chart.component";
import { EmployerMatchService } from "./services/employer-match.service";
import { RiskProfileService } from "./services/risk-profile.service";
import { UserProfileService } from "./services/user-profile.service";
import { UserService } from "./services/user.service";
import { VehicleService } from "./services/vehicle.service";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    DashboardComponent,
    RiskQuestionnaireComponent,
    NotFoundComponent,
    MyLineChartComponent,
    LoginComponent,
    LogoutComponent
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ChartsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  providers: [
    AssetService,
    EmployerMatchService,
    RiskProfileService,
    UserProfileService,
    UserService,
    VehicleService,
    AuthenticationService,
     MatCheckboxModule,
     ReactiveFormsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
