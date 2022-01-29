import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { MaterialModule } from './modules/material/material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RegisterComponent } from './components/register/register.component'
import { ReactiveFormsModule } from '@angular/forms'
import { LoginComponent } from './components/login/login.component'
import { HttpClientModule } from '@angular/common/http'
import { DepartmentListComponent } from './components/department-list/department-list.component'
import { DepartmentDetailComponent } from './components/department-detail/department-detail.component'

@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        LoginComponent,
        DepartmentListComponent,
        DepartmentDetailComponent,
    ],
    imports: [
        BrowserModule,
        MaterialModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
