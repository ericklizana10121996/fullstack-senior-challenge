import MongoRepository from "../interfaces/MongoRepository";
import { OperacionCambioRepository } from "../interfaces/OperacionCambioRepository";

class OperacionCambioRepositoryImpl extends MongoRepository implements OperacionCambioRepository {

    async findOne(filter: any): Promise<any> {
        return this.collection.findOne(filter);
    }
    
    async find(filter: any): Promise<any[]> {
        return this.collection.find(filter).toArray();
    }

    async create(data: any): Promise<any> {
        console.log('create to OperacionCambioRepositoryImpl');
        console.log('collection', this.collection);
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

export default OperacionCambioRepositoryImpl;