export class OperacionCambioSave {
    private monedaOrigen: string;
    private monedaDestino: string;
    private monto: number;
    private montoCambiado: number;
    private tipoCambio: number;
    private clientId: string;
    private fecha: string;

    constructor(monedaOrigen:string, monedaDestino:string, monto:number, montoCambiado:number, tipoCambio:number, clientId:string) {
        this.monedaOrigen = monedaOrigen;
        this.monedaDestino = monedaDestino;
        this.monto = monto;
        this.montoCambiado = montoCambiado;
        this.tipoCambio = tipoCambio;
        this.clientId=clientId;
        this.fecha = new Date().toISOString(); // `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
    }
}