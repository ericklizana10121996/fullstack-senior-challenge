import { OperacionCambioRepository } from "../../infraestructura/repository/interfaces/OperacionCambioRepository";
import { GenericService } from "./GenericService";

class OperacionCambioService implements GenericService {
    private operacionCambioRepository: OperacionCambioRepository;
    
    constructor(operacionCambioRepository: OperacionCambioRepository) {
        this.operacionCambioRepository = operacionCambioRepository;
    }

    async findOne(id: string) {
        return this.operacionCambioRepository.findOne({ _id: id });
    }

    async create(data: any) {
        return this.operacionCambioRepository.create(data);
    }

    async update(id: string, update: any) {
        return this.operacionCambioRepository.update({ _id: id }, update);
    }


    async delete(id: string) {
        return this.operacionCambioRepository.delete({ _id: id });
    }


    async find(filtro:any) {
        return this.operacionCambioRepository.find(filtro);
    }
}

export default OperacionCambioService;