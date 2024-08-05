export class OperacionCambioResponse {
    private monedaOrigen: string;
    private monedaDestino: string;
    private montoCambiado: number;
    private tipoCambio: number;
    private fecha: Date;

    constructor (monedaOrigen: string, monedaDestino: string, montoCambiado: number, tipoCambio: number) {
        this.monedaOrigen = monedaOrigen;
        this.monedaDestino = monedaDestino;
        this.montoCambiado = montoCambiado;
        this.tipoCambio = tipoCambio;
        this.fecha = new Date();
    }


    public getMonedaOrigen() { return this.monedaOrigen; }
    public getMonedaDestino() { return this.monedaDestino; }
    public getMontoCambiado() { return this.montoCambiado; }
    public getTipoCambio() { return this.tipoCambio; }
    public getFecha() { return this.fecha; }
  
}