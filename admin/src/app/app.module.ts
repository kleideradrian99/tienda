import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { InicioComponent } from './components/inicio/inicio.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { IndexClienteComponent } from './components/clientes/index-cliente/index-cliente.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { EditClienteComponent } from './components/clientes/edit-cliente/edit-cliente.component';
import { CreateClienteComponent } from './components/clientes/create-cliente/create-cliente.component';

//Kleidercito el mas pato de todo enciso y de colombia y del mundo y del universo


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    SidebarComponent,
    LoginComponent,
    IndexClienteComponent,
    EditClienteComponent,
    CreateClienteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    routing,


    NgbPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
