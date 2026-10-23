import { JobEntity } from './entity/JobEntity';
import { PayEntity } from './entity/PayEntity';
import { RoleEntity } from './entity/RoleEntity';
export type * from './AitrainingJobsTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { AitrainingJobsEntityBase } from './AitrainingJobsEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class AitrainingJobsSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Job(entopts?: Record<string, any>): JobEntity;
    Pay(entopts?: Record<string, any>): PayEntity;
    Role(entopts?: Record<string, any>): RoleEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): AitrainingJobsSDK;
    tester(testopts?: any, sdkopts?: any): AitrainingJobsSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof AitrainingJobsSDK;
export { stdutil, config, BaseFeature, AitrainingJobsEntityBase, AitrainingJobsSDK, SDK, };
export type { DirectResult };
