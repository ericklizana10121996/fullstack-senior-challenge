import { TipoCambio } from "../../domain/entities/TipoCambio";
import TipoCambioService from "../../domain/services/TipoCambioService";

export class TipoCambioApplicationService {
    private tipoCambioService: TipoCambioService;

    constructor(tipoCambioService: TipoCambioService) {
        this.tipoCambioService = tipoCambioService;
    }

    async getApiExChangeRate() {
        return await this.tipoCambioService.getAsyncExternalApi();
    }

    async saveExChangeRate(): Promise<TipoCambio> {
        const response = await this.getApiExChangeRate();

        this.tipoCambioService.create(response);

        return response;
    }
}