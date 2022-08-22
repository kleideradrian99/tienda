import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';

declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-inventario-producto',
  templateUrl: './inventario-producto.component.html',
  styleUrls: ['./inventario-producto.component.css']
})
export class InventarioProductoComponent implements OnInit {

  public id: any;
  public token;
  public _idUser;
  public producto: any = {};
  public inventario: any = {};
  public load_btn = false;
  public inventarios: Array<any> = [];

  constructor(
    private _route: ActivatedRoute,
    private _productoService: ProductoService,
  ) {
    this.token = localStorage.getItem('token');
    this._idUser = localStorage.getItem('_id');
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        this._productoService.obtener_producto_admin(this.id, this.token).subscribe(
          response => {
            if (response.data == undefined) {
              this.producto = undefined;
            } else {
              this.producto = response.data;

              //Inventario Listando
              this._productoService.listar_inventario_admin(this.producto._id, this.token).subscribe(
                response => {
                  this.inventarios = response.data;
                }, error => {
                  console.log(error)
                }
              )
            }
          }, error => {
            console.log(error);
          }
        )
      }
    )
  }

  eliminar(id: any) {
    this.load_btn = true;
    this._productoService.eliminar_inventario_admin(id, this.token).subscribe(
      response => {
        iziToast.show({
          title: 'Success',
          titleColor: '#141514',
          messageColor: '#000',
          backgroundColor: '#B2FFB8',
          class: 'text-success',
          position: 'topRight',
          message: 'Se Elimino Correctamente el cliente'
        });

        $('#delete-' + id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        this._productoService.listar_inventario_admin(this.producto._id, this.token).subscribe(
          response => {
            this.inventarios = response.data;
          }, error => {
            console.log(error)
          }
        )

        this.load_btn = false;
      }, error => {

        iziToast.show({
          title: 'Success',
          titleColor: '#FF2D00',
          messageColor: '#000',
          backgroundColor: '#FFB2A2',
          class: 'text-success',
          position: 'topRight',
          message: 'Ocurrio un error en el servidor'
        });
        console.log(error);
        this.load_btn = false;
      }
    )
  }

  registro_inventario(inventarioForm: any) {
    if (inventarioForm.valid) {
      let data = {
        producto: this.producto._id,
        cantidad: inventarioForm.value.cantidad,
        admin: this._idUser,
        proveedor: inventarioForm.value.proveedor
      }

      this._productoService.registro_inventario_producto_admin(data, this.token).subscribe(
        response => {
          iziToast.show({
            title: 'Success',
            titleColor: '#141514',
            messageColor: '#000',
            backgroundColor: '#B2FFB8',
            class: 'text-success',
            position: 'topRight',
            message: 'Se actualizo el stock del producto'
          });

          this._productoService.listar_inventario_admin(this.producto._id, this.token).subscribe(
            response => {
              this.inventarios = response.data;
            }, error => {
              console.log(error)
            }
          )
          
        }, error => {
          console.log(error)
        }
      )

    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: '#FF0000',
        messageColor: '#000',
        class: 'text-danger',
        position: 'topRight',
        message: 'Los datos del formulario no son validos'
      });
    }
  }

}
