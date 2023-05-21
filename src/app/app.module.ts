import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { JwtInterceptor, ErrorInterceptor, fakeBackendProvider } from './helpers';
import { AlertComponent } from './shared/alert/alert.component';
import { AddEditComponent } from './features/user/add-edit/add-edit.component';
import { LayoutComponent } from './features/user/layout/layout.component';
import { ListComponent } from './features/user/list/list.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MainSideBarComponent } from './components/main-side-bar/main-side-bar.component';
import { DashbordComponent } from './components/dashbord/dashbord.component';
import { IndicateursComponent } from './components/indicateurs/indicateurs.component';
import { BookingCalendarComponent } from './components/booking-calendar/booking-calendar.component';


// used to create fake backend
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LayoutComponent,
        AddEditComponent,
        ListComponent,
        NavBarComponent,        
        MainSideBarComponent, DashbordComponent, IndicateursComponent, BookingCalendarComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };