import { HistoryClientRequest } from "../../domain/dto/HistoryClientRequest";
import { OperacionCambioRequest } from "../../domain/dto/OperacionCambioRequest";
import { OperacionCambioSave } from "../../domain/dto/OperacionCambioSave";
import { OperacionCambio } from "../../domain/entities/OperacionCambio";
import { TipoCambio } from "../../domain/entities/TipoCambio";
import OperacionCambioService from "../../domain/services/OperacionCambioService";

export class OperacionCambioApplicationService {
    private operacionCambioService: OperacionCambioService;
    private operacionCambio: OperacionCambio;

    constructor(operacionCambioService: OperacionCambioService) {
        this.operacionCambio = new OperacionCambio();
        this.operacionCambioService = operacionCambioService;
    }

    async saveExChange(operacionRequest: OperacionCambioRequest, clientId: string, tipoCambio: TipoCambio): Promise<any> {
        const operacionCambioResponse: OperacionCambioSave = this.operacionCambio.convert(operacionRequest, clientId, tipoCambio);
        await this.operacionCambioService.create(operacionCambioResponse);

        return operacionCambioResponse;
    }


    async getHistoryClient(filtro: any) {
        return await this.operacionCambioService.find(filtro);
    }
}