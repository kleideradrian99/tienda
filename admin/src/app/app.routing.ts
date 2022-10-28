import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from "./components/login/login.component";
import { AdminGuard } from "./guards/admin.guard";
import { IndexClienteComponent } from "./components/clientes/index-cliente/index-cliente.component";
import { CreateClienteComponent } from "./components/clientes/create-cliente/create-cliente.component";
import { EditClienteComponent } from "./components/clientes/edit-cliente/edit-cliente.component";
import { CreateProductoComponent } from "./components/productos/create-producto/create-producto.component";
import { IndexProductosComponent } from "./components/productos/index-productos/index-productos.component";
import { UpdateProductoComponent } from "./components/productos/update-producto/update-producto.component";
import { InventarioProductoComponent } from "./components/productos/inventario-producto/inventario-producto.component";
import { CreateCuponComponent } from "./components/cupones/create-cupon/create-cupon.component";
import { IndexCuponComponent } from "./components/cupones/index-cupon/index-cupon.component";
import { UpdateCuponComponent } from "./components/cupones/update-cupon/update-cupon.component";
import { ConfigComponent } from "./components/config/config.component";
import { VariedadProducoComponent } from "./components/productos/variedad-produco/variedad-produco.component";
import { GaleriaProducoComponent } from "./components/productos/galeria-produco/galeria-produco.component";
import { IndexDescuentoComponent } from "./components/descuento/index-descuento/index-descuento.component";
import { CreateDescuentoComponent } from "./components/descuento/create-descuento/create-descuento.component";
import { EditDescuentoComponent } from "./components/descuento/edit-descuento/edit-descuento.component";

const appRoute: Routes = [
    { path: '', redirectTo: 'Inicio', pathMatch: 'full' },
    { path: 'Inicio', component: InicioComponent, canActivate: [AdminGuard] },
    {
        path: 'panel', children: [
            { path: 'clientes', component: IndexClienteComponent, canActivate: [AdminGuard] },
            { path: 'clientes/registro', component: CreateClienteComponent, canActivate: [AdminGuard] },
            { path: 'clientes/:id', component: EditClienteComponent, canActivate: [AdminGuard] },

            { path: 'productos/registro', component: CreateProductoComponent, canActivate: [AdminGuard] },
            { path: 'productos', component: IndexProductosComponent, canActivate: [AdminGuard] },
            { path: 'productos/:id', component: UpdateProductoComponent, canActivate: [AdminGuard] },
            { path: 'productos/inventario/:id', component: InventarioProductoComponent, canActivate: [AdminGuard] },
            { path: 'productos/variedades/:id', component: VariedadProducoComponent, canActivate: [AdminGuard] },
            { path: 'productos/galeria/:id', component: GaleriaProducoComponent, canActivate: [AdminGuard] },

            { path: 'cupones/registro', component: CreateCuponComponent, canActivate: [AdminGuard] },
            { path: 'cupones', component: IndexCuponComponent, canActivate: [AdminGuard] },
            { path: 'cupones/:id', component: UpdateCuponComponent, canActivate: [AdminGuard] },

            { path: 'descuentos', component: IndexDescuentoComponent, canActivate: [AdminGuard] },
            { path: 'descuentos/registro', component: CreateDescuentoComponent, canActivate: [AdminGuard] },
            { path: 'descuentos/:id', component: EditDescuentoComponent, canActivate: [AdminGuard] },

            { path: 'configuraciones', component: ConfigComponent, canActivate: [AdminGuard] },
        ]
    },
    { path: 'login', component: LoginComponent }
]

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);