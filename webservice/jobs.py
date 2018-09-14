from Deadline.Scripting import *
import json


# This script is for Dealine Online Manager, maintained by elisha.
def __main__(dlArgs, qsArgs):
    filter_name = qsArgs.get('username', None)
    result = []

    if filter_name is None:
        return ('Lacks of username', 405)

    jobs = WebServiceUtils.GetJobs()

    for job in jobs:
        if (job is not None and job['Status'] != 'Deleted'):
            if job['Status'] != 'Active' and job['Status'] != 'Pending' and job['UserName'] != filter_name:
                continue

            obj = {
                'name': job['Name'],
                'batch': job['BatchName'],
                'plugin': job['PluginName'],
                'user': job['UserName'],
                'status': job['Status'],
                'priority': job['Priority'],
                'id': job['JobId'],
                'submitDate': job['SubmitDateTimeString'],
                'startDate': job['StartedDateTimeString'],
                'completedDate': job['CompletedDateTimeString'],
                'firstFrame': job['FirstFrame'],
                'lastFrame': job['LastFrame'],
                'taskCount': job['TaskCount'],
                'pool': job['Pool'],
                'completedTasks': job['JobCompletedTasks'],
                'queuedTasks': job['JobQueuedTasks'],
                'suspendedTasks': job['JobSuspendedTasks'],
                'renderingTasks': job['JobRenderingTasks'],
                'failedTasks': job['JobFailedTasks'],
                'pendingTasks': job['JobPendingTasks'],
                'errors': job['ErrorReports'],
                'singleProgress': job['SingleTaskProgress'],
            }
            result.append(obj)

    return json.dumps(result)
