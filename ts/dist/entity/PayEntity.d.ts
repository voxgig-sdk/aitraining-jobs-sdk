import { AitrainingJobsEntityBase } from '../AitrainingJobsEntityBase';
import type { AitrainingJobsSDK } from '../AitrainingJobsSDK';
import type { Control } from '../types';
import type { Pay, PayListMatch } from '../AitrainingJobsTypes';
declare class PayEntity extends AitrainingJobsEntityBase<Pay> {
    constructor(client: AitrainingJobsSDK, entopts: any);
    make(this: PayEntity): PayEntity;
    list(this: any, reqmatch?: PayListMatch, ctrl?: Control): Promise<PayEntity[]>;
}
export { PayEntity };
