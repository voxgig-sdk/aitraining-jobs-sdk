# AitrainingJobs SDK feature factory

from aitrainingjobs_sdk.feature.base_feature import AitrainingJobsBaseFeature
from aitrainingjobs_sdk.feature.ratelimit_feature import AitrainingJobsRatelimitFeature
from aitrainingjobs_sdk.feature.retry_feature import AitrainingJobsRetryFeature
from aitrainingjobs_sdk.feature.test_feature import AitrainingJobsTestFeature
from aitrainingjobs_sdk.feature.timeout_feature import AitrainingJobsTimeoutFeature


_FEATURES = {
    "base": lambda: AitrainingJobsBaseFeature(),
    "ratelimit": lambda: AitrainingJobsRatelimitFeature(),
    "retry": lambda: AitrainingJobsRetryFeature(),
    "test": lambda: AitrainingJobsTestFeature(),
    "timeout": lambda: AitrainingJobsTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
