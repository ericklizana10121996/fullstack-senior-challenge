import { TipoCambioApplicationService } from "../services/TipoCambioApplicationService";

export class TipoCambioApplicationController {
    private tipoCambioService:TipoCambioApplicationService;
    
    constructor(tipoCambioService:TipoCambioApplicationService) {
        this.tipoCambioService = tipoCambioService;
        this.autoSaveExchange();
    }

    async saveExchangeRate(req:any, res:any) {
        try {
            const rate = await this.tipoCambioService.saveExChangeRate();
            console.log('rate', rate)
            if (rate) {
                res.json({ rate: rate });
            } else {
                res.status(404).send('Rate not found');
            }
        } catch (error:any) {
            res.status(500).send(error.message);
        }
    }


    async autoSaveExchange() {
        setInterval(async () => {
            await this.tipoCambioService.saveExChangeRate();
        }, 30 * 1000);
    }
}