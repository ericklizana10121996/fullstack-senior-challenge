// import { ConstantsDomain } from "../constants/ConstantsDomain";

export class OperacionCambioRequest {
    public monedaOrigen: string;
    public monedaDestino: string;
    public monto: number;

    constructor(monedaOrigen, monedaDestino, monto) {
        this.monedaOrigen = monedaOrigen;
        this.monedaDestino = monedaDestino;
        this.monto = monto;
    }

    // public getMonedaOrigen() { return this.monedaOrigen; }
    // public getMonedaDestino() { return this.monedaDestino; }
    // public getMonto() { return this.monto; }
    
}