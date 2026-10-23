# AitrainingJobs SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module AitrainingJobsFeatures
  def self.make_feature(name)
    case name
    when "base"
      AitrainingJobsBaseFeature.new
    when "ratelimit"
      AitrainingJobsRatelimitFeature.new
    when "retry"
      AitrainingJobsRetryFeature.new
    when "test"
      AitrainingJobsTestFeature.new
    when "timeout"
      AitrainingJobsTimeoutFeature.new
    else
      AitrainingJobsBaseFeature.new
    end
  end
end
