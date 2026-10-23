# AitrainingJobs SDK exists test

import pytest
from aitrainingjobs_sdk import AitrainingJobsSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = AitrainingJobsSDK.test(None, None)
        assert testsdk is not None
