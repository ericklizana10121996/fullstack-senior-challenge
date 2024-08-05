import { RepositoryConstantsMongoDB } from "../../constants/RepositoryConstantsMongoDB";
import MongoRepository from "../interfaces/MongoRepository";
import { TipoCambioRepository } from "../interfaces/TipoCambioRepository";

class TipoCambioRepositoryImpl extends MongoRepository implements TipoCambioRepository {

    async findOne(filter: any): Promise<any> {
        return this.collection.findOne(filter);
    }
    
    async find(filter: any): Promise<any[]> {
        return this.collection.find(filter).toArray();
    }

    async create(data: any): Promise<any> {
        try {
            return await this.collection.insertOne(data);
        } catch (error) {
            console.error(`Error inserting document: ${error}`);
            throw error;
        }
    }

    async update(filter: any, update: any): Promise<any> {
        return this.collection.updateOne(filter, { $set: update });
    }

    async delete(filter: any): Promise<any> {
        return this.collection.deleteOne(filter);
    }
}

export default TipoCambioRepositoryImpl;