import TipoCambioRepositoryImpl from "../../infraestructura/repository/implementations/TipoCambioRepositoryImpl";
import TipoCambioRepository from "../../infraestructura/repository/implementations/TipoCambioRepositoryImpl";
import { ExternalApiService } from "../../infraestructura/services/external/ExternalApiService";
import { GenericService } from "./GenericService";

class TipoCambioService implements GenericService {
    private tipoCambioRepository: TipoCambioRepository;
    private externalApiService: ExternalApiService;

    constructor(tipoCambioRepository: TipoCambioRepositoryImpl, externalApiService: ExternalApiService) {
        this.tipoCambioRepository = tipoCambioRepository;
        this.externalApiService = externalApiService;
    }

    async findOne(id: string) {
        return this.tipoCambioRepository.findOne({ _id: id });
    }

    async create(data: any) {
        return this.tipoCambioRepository.create(data);
    }


    async update(id: string, update: any) {
        return this.tipoCambioRepository.update({ _id: id }, update);
    }


    async delete(id: string) {
        return this.tipoCambioRepository.delete({ _id: id });
    }


    async getAsyncExternalApi () {
        return await this.externalApiService.fetchExchangeRate();
    }
}

export default TipoCambioService;