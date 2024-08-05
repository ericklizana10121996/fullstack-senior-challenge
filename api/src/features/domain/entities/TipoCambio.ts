/**  */
export class TipoCambio {
    public compra: number;
    public venta: number;
    public origen: string;
    public moneda: string;
    public fecha: string;

    constructor(compra, venta, origen, moneda, fecha) {
        this.compra = compra;
        this.venta = venta;
        this.origen = origen;
        this.moneda = moneda;
        this.fecha  = fecha;
    }

    public isValid(): boolean {

        if (this.compra < 0 || this.venta < 0) {
            return false;
        }
        
        return true;
    }

    // public getFactorCompra () { return this.compra; }
    // public getFactorVenta () { return this.venta; }
}