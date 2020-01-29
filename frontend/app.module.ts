import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core'; 
import { NgxsModule } from '@ngxs/store';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { AccueilComponent } from './accueil/accueil.component';
import { PhoneNumberPipe } from './phone-number.pipe';
import { ErrorDirective } from './error.directive';

import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const appRoutes: Routes = [
  { path: 'formulaire', component: FormulaireComponent },
  { path: 'lazy', loadChildren: () => import('./lazy-loading.module').then(m => m.LazyLoadingModule) }
];

@NgModule({
  declarations: [
    AppComponent,
    FormulaireComponent,
    AccueilComponent,
    PhoneNumberPipe, 
    ErrorDirective
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule.forRoot ([ ]),
    StoreModule.forRoot([ ]),
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
