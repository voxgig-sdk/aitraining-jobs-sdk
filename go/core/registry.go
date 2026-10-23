package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewJobEntityFunc func(client *AitrainingJobsSDK, entopts map[string]any) AitrainingJobsEntity

var NewPayEntityFunc func(client *AitrainingJobsSDK, entopts map[string]any) AitrainingJobsEntity

var NewRoleEntityFunc func(client *AitrainingJobsSDK, entopts map[string]any) AitrainingJobsEntity

