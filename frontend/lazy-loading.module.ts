import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyLoadingRoutingModule } from './lazy-loading-routing.module';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { PanierComponent } from './panier/panier.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  imports: [
    CommonModule,
    LazyLoadingRoutingModule
  ],
  declarations: [
    CatalogueComponent, 
    PanierComponent, 
    HeaderComponent
  ]
})
export class LazyLoadingModule { }
