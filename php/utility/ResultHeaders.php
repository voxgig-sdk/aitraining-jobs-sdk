<?php
declare(strict_types=1);

// AitrainingJobs SDK utility: result_headers

class AitrainingJobsResultHeaders
{
    public static function call(AitrainingJobsContext $ctx): ?AitrainingJobsResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
