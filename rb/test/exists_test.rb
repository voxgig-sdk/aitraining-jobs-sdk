# AitrainingJobs SDK exists test

require "minitest/autorun"
require_relative "../AitrainingJobs_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = AitrainingJobsSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
