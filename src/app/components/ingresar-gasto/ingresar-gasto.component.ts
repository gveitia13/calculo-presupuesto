import {Component} from '@angular/core';
import {PresupuestoService} from "../../services/presupuesto.service";

@Component({
  selector: 'app-ingresar-gasto',
  templateUrl: './ingresar-gasto.component.html',
  styleUrls: ['./ingresar-gasto.component.css']
})
export class IngresarGastoComponent {
  nombreGasto: string
  cantidad: number
  formularioIncorrecto: boolean
  textTncorrecto: string

  constructor(private _presupuestoService: PresupuestoService) {
    this.nombreGasto = ''
    this.cantidad = 0
    this.formularioIncorrecto = false
    this.textTncorrecto = 'Nombre gasto o cantidad incorrecta'
  }

  agregarGasto() {
    if (this.cantidad > this._presupuestoService.restante) {
      this.formularioIncorrecto = true
      this.textTncorrecto = 'Cantidad ingresada es mayor que el restante'
      return
    }

    if (!this.nombreGasto || this.cantidad <= 0) {
      this.formularioIncorrecto = true
      this.textTncorrecto = 'Nombre gasto o cantidad incorrecta'
    } else {
      //creamos el objeto
      const GASTO = {
        nombre: this.nombreGasto,
        cantidad: this.cantidad
      }
      //enviamos el objeto a los subscriptores via subject
      this._presupuestoService.agregarGasto(GASTO)

      //reseteamos formularios
      this.formularioIncorrecto = false
      this.nombreGasto = ''
      this.cantidad = 0
    }
  }

}
