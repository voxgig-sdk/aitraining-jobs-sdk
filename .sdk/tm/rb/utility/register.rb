# AitrainingJobs SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

AitrainingJobsUtility.registrar = ->(u) {
  u.clean = AitrainingJobsUtilities::Clean
  u.clean_add = AitrainingJobsUtilities::CleanAdd
  u.clean_explain = AitrainingJobsUtilities::CleanExplain
  u.done = AitrainingJobsUtilities::Done
  u.make_error = AitrainingJobsUtilities::MakeError
  u.feature_add = AitrainingJobsUtilities::FeatureAdd
  u.feature_hook = AitrainingJobsUtilities::FeatureHook
  u.feature_init = AitrainingJobsUtilities::FeatureInit
  u.fetcher = AitrainingJobsUtilities::Fetcher
  u.make_fetch_def = AitrainingJobsUtilities::MakeFetchDef
  u.make_context = AitrainingJobsUtilities::MakeContext
  u.make_options = AitrainingJobsUtilities::MakeOptions
  u.make_request = AitrainingJobsUtilities::MakeRequest
  u.make_response = AitrainingJobsUtilities::MakeResponse
  u.make_result = AitrainingJobsUtilities::MakeResult
  u.make_point = AitrainingJobsUtilities::MakePoint
  u.make_spec = AitrainingJobsUtilities::MakeSpec
  u.make_url = AitrainingJobsUtilities::MakeUrl
  u.param = AitrainingJobsUtilities::Param
  u.prepare_auth = AitrainingJobsUtilities::PrepareAuth
  u.prepare_body = AitrainingJobsUtilities::PrepareBody
  u.prepare_headers = AitrainingJobsUtilities::PrepareHeaders
  u.prepare_method = AitrainingJobsUtilities::PrepareMethod
  u.prepare_params = AitrainingJobsUtilities::PrepareParams
  u.prepare_path = AitrainingJobsUtilities::PreparePath
  u.prepare_query = AitrainingJobsUtilities::PrepareQuery
  u.graphql_body = AitrainingJobsUtilities::GraphqlBody
  u.graphql_errors = AitrainingJobsUtilities::GraphqlErrors
  u.result_basic = AitrainingJobsUtilities::ResultBasic
  u.result_body = AitrainingJobsUtilities::ResultBody
  u.result_headers = AitrainingJobsUtilities::ResultHeaders
  u.transform_request = AitrainingJobsUtilities::TransformRequest
  u.transform_response = AitrainingJobsUtilities::TransformResponse
}
