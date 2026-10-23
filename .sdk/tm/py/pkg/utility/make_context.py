# AitrainingJobs SDK utility: make_context

from projectname_sdk.core.context import AitrainingJobsContext


def make_context_util(ctxmap, basectx):
    return AitrainingJobsContext(ctxmap, basectx)
