/* eslint-disable no-unused-vars */
import axios, { AxiosInstance } from "axios";
import { CreateParams, CreateResult, DataProvider, DeleteManyParams, DeleteManyResult, DeleteParams, DeleteResult, GetListParams, GetListResult, GetManyParams, GetManyReferenceParams, GetManyReferenceResult, GetManyResult, GetOneParams, GetOneResult, Identifier, RaRecord, UpdateManyParams, UpdateManyResult, UpdateParams, UpdateResult } from "react-admin";
import logger, { Logger } from 'loglevel';
import uniqueId from 'lodash/uniqueId';

export class DataProviderImpl {
    private static storage = new Map<string, DataProviderImpl>();
    private logger: Logger = logger.getLogger('provider:' + this.resource)

    constructor(private readonly resource: string, private readonly http: AxiosInstance) {}

    public async getList(params: GetListParams): Promise<GetListResult<RaRecord>> {
        const msg = ` [${uniqueId()}] ${DataProviderImpl.name} ${this.getList.name}`
        this.logger.debug('REQUEST' + msg, params);
        try {
            let response;
            if (params.filter && typeof params.filter === 'object' && Reflect.has(params.filter, 'q')) {
                response = await this.http.get(`${this.resource}/search/query?${this.getQs(params)}`);
            } else {
                response = await this.http.get(`${this.resource}?${this.getQs(params)}`);
            }
    
            this.logger.debug('RESPONSE' + msg, response);
            
            return { 
                data: response.data._embedded[this.resource], 
                total: response.data.page.totalElements
            };
        } catch (e) {
            this.logger.error('ERROR' + msg, e);
            throw e;
        }
    }

    protected getQs(params: GetListParams): URLSearchParams {
        const qs = new URLSearchParams();

        qs.append('page', `${params.pagination.page - 1}`);
        qs.append('size', params.pagination.perPage.toString());
        qs.append('sort', `${params.sort.field},${params.sort.order.toLowerCase()}`);

        if (!!params.filter && typeof params.filter === 'object') {
            Object.entries(params.filter).forEach(([key, value]) => {
                if (!value) return;

                qs.append(key, value.toString());
            })
        }

        return qs;
    }

    public async getOne(params: GetOneParams<RaRecord>): Promise<GetOneResult<RaRecord>> {
        const msg = ` [${uniqueId()}] ${DataProviderImpl.name} ${this.getOne.name}`
        this.logger.debug('REQUEST' + msg, params);
        try {
            const response = await this.http.get(`/${this.resource}/${encodeURI(params.id.toString())}`);
            this.logger.debug('RESPONSE' + msg, response);
            
            return { data: response.data };
        } catch (e) {
            this.logger.error('ERROR' + msg, e);
            throw e;
        }
    }

    public async getMany(params: GetManyParams): Promise<GetManyResult<RaRecord>> {
        throw new Error('Not implemented');
    }

    public async getManyReference(params: GetManyReferenceParams): Promise<GetManyReferenceResult<RaRecord>> {
        throw new Error('Not implemented');
    }

    public async update(params: UpdateParams<any>): Promise<UpdateResult<RaRecord>> {
        const msg = ` [${uniqueId()}] ${DataProviderImpl.name} ${this.update.name}`
        this.logger.debug('REQUEST' + msg, params);
        try {
            const response = await this.http.put(`${this.resource}/${encodeURI(params.id.toString())}`, params.data);
            this.logger.debug('RESPONSE' + msg, response);

            return { data: response.data };
        } catch (e) {
            this.logger.error('ERROR' + msg, e);
            throw e;
        }
    }

    public async updateMany(params: UpdateManyParams<any>): Promise<UpdateManyResult<RaRecord>> {
        throw new Error('Not implemented');
    }

    public async create(params: CreateParams): Promise<CreateResult<RaRecord>>  {
        const msg = ` [${uniqueId()}] ${DataProviderImpl.name} ${this.create.name}`
        this.logger.debug('REQUEST' + msg, params);
        try {
            const response = await this.http.post(`${this.resource}`, params.data);
            this.logger.debug('RESPONSE' + msg, response);

            return { data: response.data };
        } catch (e) {
            this.logger.error('ERROR' + msg, e);
            throw e;
        }
    }

    public async delete(params: DeleteParams<RaRecord>): Promise<DeleteResult<RaRecord>>  {
        const msg = ` [${uniqueId()}] ${DataProviderImpl.name} ${this.delete.name}`
        this.logger.debug('REQUEST' + msg, params);
        try {
            const response = await this.http.delete(`${this.resource}/${encodeURI(params.id.toString())}`);
            this.logger.debug('RESPONSE' + msg, response);

            return { data: response.data };
        } catch (e) {
            this.logger.error('ERROR' + msg, e);
            throw e;
        }
    }

    public async deleteMany(params: DeleteManyParams<RaRecord>): Promise<DeleteManyResult<RaRecord>>  {
        await Promise.all(params.ids.map(id => this.delete({ id })))

        return { data: params.ids };
    }

    public static getProvider(http: AxiosInstance): DataProvider {
        return new Proxy({} as DataProvider, {
            get(_, property) {
                return (resource: string, ...other: unknown[]) => {
                    if (!DataProviderImpl.storage.has(resource)) !DataProviderImpl.storage.set(resource, new DataProviderImpl(resource, http));
                    const instance = DataProviderImpl.storage.get(resource)!;

                    if (!Reflect.has(instance, property)) throw new Error(`Method ${property.toString()} not implemented`);

                    return Reflect.apply(Reflect.get(instance, property), instance, other);
                }
            }
        });
    }
}
