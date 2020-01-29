import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CatalogueComponent } from './catalogue/catalogue.component';
import { PanierComponent } from './panier/panier.component';


const routes: Routes = [
  /*{ path: '', component: CatalogueComponent, children : [*/
    { path: 'panier', component: PanierComponent },
    { path: 'catalogue', component: CatalogueComponent }//]}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [
  ],
  exports: [RouterModule]
})
export class LazyLoadingRoutingModule { }
