import { Collection, Db, MongoClient } from "mongodb";
import { MongoConfig } from "../config/mongoConfig/MongoConfig";

class MongoRepository {
    // protected client: MongoClient;
    protected db: Db;
    protected collection: Collection;
    private collectionName: string
  
    constructor(db: Db, collectionName: string) {
      this.db = db;
      this.collectionName = collectionName;

      this.collection = this.db.collection(this.collectionName);
    }

  
    async findOne(filter: any) {
      return this.collection.findOne(filter);
    }
  
  
    async find(filter: any) {
      return this.collection.find(filter).toArray();
    }
  
  
    async create(doc: any) {
      return this.collection.insertOne(doc);
    }
  
  
    async update(filter: any, update: any) {
      return this.collection.updateOne(filter, update);
    }
  
  
    async delete(filter: any) {
      return this.collection.deleteOne(filter);
    }
  
  }
  
  
  export default MongoRepository;