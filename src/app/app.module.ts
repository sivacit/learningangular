import { BrowserModule } from '@angular/platform-browser';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router'
import {PriceService} from './price.service'
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LoadingComponent } from './loading/loading.component';
import { ProductComponent } from './product/product.component';

const routes:Routes = [
  { path: '', component: LoadingComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about/:category/:product', component: AboutComponent }
  // { path: 'contact', component: ContactComponent },
  // { path: 'contactus', redirectTo: 'contact' }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    LoadingComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes), // <-- routes
    AppRoutingModule,
    CommonModule,
    HttpClientModule    
  ],
  providers: [PriceService],
  bootstrap: [AppComponent]
})


export class AppModule { }
