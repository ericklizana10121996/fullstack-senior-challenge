export interface TipoCambioRepository {
    findOne(filter: any): Promise<any>;

    find(filter: any): Promise<any[]>;

    create(data: any): Promise<any>;

    update(filter: any, update: any): Promise<any>;

    delete(filter: any): Promise<any>;
}