
export interface GenericService {
    findOne(filter: any): Promise<any>;

    create(data: any): Promise<any>;

    update(filter: any, data: any): Promise<any>;

    delete(filter: any): Promise<any>;
}