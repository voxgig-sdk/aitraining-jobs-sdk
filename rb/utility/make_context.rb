# AitrainingJobs SDK utility: make_context
require_relative '../core/context'
module AitrainingJobsUtilities
  MakeContext = ->(ctxmap, basectx) {
    AitrainingJobsContext.new(ctxmap, basectx)
  }
end
