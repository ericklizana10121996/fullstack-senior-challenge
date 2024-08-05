
import { OperacionCambioRequest } from '../dto/OperacionCambioRequest';
import { OperacionCambioResponse } from '../dto/OperacionCambioResponse';

import { Constantes } from '../../../core/constants/UtilConstants';
import { TipoCambio } from './TipoCambio';
import { OperacionCambioSave } from '../dto/OperacionCambioSave';
import { ConstantsDomain } from '../constants/ConstantsDomain';


export class OperacionCambio {
    private montoCambiado: number;
    private factorCambio: number;
    constructor() {
        this.montoCambiado = Constantes.INIT_VALOR_CERO;
        this.factorCambio = Constantes.INIT_VALOR_CERO;
    }


    
    public isValidAmount(monto: number) {
        if (!ConstantsDomain.REGEX_NUMBER.test(monto.toString())) {
            throw new Error(`Monto ${monto} no es válido`);
        }
    }

    public convert (operacionRequest: OperacionCambioRequest, clientId: string, tipoCambio: TipoCambio): OperacionCambioSave {
        
       
        if (!tipoCambio || tipoCambio.venta <= Constantes.INIT_VALOR_CERO || tipoCambio.compra < Constantes.INIT_VALOR_CERO) {
            throw new Error(`Ha sucedido un error en la validación preliminar de la conversión, intentelo nuevamente...`);     
        }
        
        this.isValidAmount(operacionRequest.monto);
       

        this.factorCambio = tipoCambio.venta;

        if (operacionRequest.monedaOrigen === Constantes.TIPO_MONEDA_SOL ) {
            this.montoCambiado = operacionRequest.monto / this.factorCambio;
        } else {
            this.factorCambio = tipoCambio.compra;
            this.montoCambiado = operacionRequest.monto * this.factorCambio;
        }

        this.montoCambiado = parseFloat(this.montoCambiado.toFixed(2));
        return new OperacionCambioSave(operacionRequest.monedaOrigen, operacionRequest.monedaDestino, operacionRequest.monto, this.montoCambiado, this.factorCambio, clientId);
    }
}