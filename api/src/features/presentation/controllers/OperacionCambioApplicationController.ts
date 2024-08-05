import { HistoryClientRequest } from "../../domain/dto/HistoryClientRequest";
import { OperacionCambioRequest } from "../../domain/dto/OperacionCambioRequest";
import { OperacionCambioResponse } from "../../domain/dto/OperacionCambioResponse";
import { TipoCambio } from "../../domain/entities/TipoCambio";
import { OperacionCambioApplicationService } from "../services/OperacionCambioApplicationService";
import { TipoCambioApplicationService } from "../services/TipoCambioApplicationService";

export class OperacionCambioApplicationController {
    private tipoCambioService:TipoCambioApplicationService;
    private operacionCambioService:OperacionCambioApplicationService;
    
    constructor(operacionCambioService:OperacionCambioApplicationService,
        tipoCambioService:TipoCambioApplicationService
    ) {
        this.operacionCambioService = operacionCambioService;
        this.tipoCambioService = tipoCambioService;
    }

    async saveExchange(req:OperacionCambioRequest, clientId: string, res:any) {
        try {
            // console.log('req', req);
            // console.log('clientId', clientId);
            const tipoCambioApi:TipoCambio = await this.tipoCambioService.getApiExChangeRate();
            // console.log('tipoCambioApi', tipoCambioApi);
            const exchange = await this.operacionCambioService.saveExChange(req, clientId, tipoCambioApi);
            // console.log('exchange', exchange)
            if (exchange) {
                res.json({ exchange: exchange });
            } else {
                res.status(404).send('Exchage not found');
            }
        } catch (error:any) {
            res.status(500).send(error.message);
        }
    }


    async historyClient(req: HistoryClientRequest, clientId:string, res: any) {
        try {
            const filtro = { 
                clientId: clientId,
                fecha: {
                    $gte: req.fechaI,
                    $lte: req.fechaF
                }
            };
            // console.log('filtro', filtro);
            const list = await this.operacionCambioService.getHistoryClient(filtro);
            if (list) {
                res.json({ history: list });
            } else {
                res.status(404).send('Exchage not found');
            }
        } catch (error:any) {
            res.status(500).send(error.message);
        }
    }

}