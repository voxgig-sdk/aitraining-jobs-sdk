import { AitrainingJobsEntityBase } from '../AitrainingJobsEntityBase';
import type { AitrainingJobsSDK } from '../AitrainingJobsSDK';
import type { Control } from '../types';
import type { Job, JobListMatch } from '../AitrainingJobsTypes';
declare class JobEntity extends AitrainingJobsEntityBase<Job> {
    constructor(client: AitrainingJobsSDK, entopts: any);
    make(this: JobEntity): JobEntity;
    list(this: any, reqmatch?: JobListMatch, ctrl?: Control): Promise<JobEntity[]>;
}
export { JobEntity };
