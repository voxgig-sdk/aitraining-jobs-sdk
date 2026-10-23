import { AitrainingJobsEntityBase } from '../AitrainingJobsEntityBase';
import type { AitrainingJobsSDK } from '../AitrainingJobsSDK';
import type { Control } from '../types';
import type { Role, RoleListMatch } from '../AitrainingJobsTypes';
declare class RoleEntity extends AitrainingJobsEntityBase<Role> {
    constructor(client: AitrainingJobsSDK, entopts: any);
    make(this: RoleEntity): RoleEntity;
    list(this: any, reqmatch?: RoleListMatch, ctrl?: Control): Promise<RoleEntity[]>;
}
export { RoleEntity };
