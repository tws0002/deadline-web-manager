from Deadline.Scripting import *
import json


# This script is for Dealine Online Manager, maintained by elisha.
def __main__(dlArgs, qsArgs):
    action = qsArgs.get('action', None)
    job_id = qsArgs.get('id', None)

    if action is None or job_id is None:
        return ('Lacks of parameters', 404)

    rep = RepositoryUtils
    job = rep.GetJob(job_id, True)

    if action == 'suspend':
        rep.SuspendJob(job)
    elif action == 'resume':
        rep.ResumeJob(job)
    elif action == 'resumefailed':
        rep.ResumeFailedJob(job)
    elif action == 'requeue':
        rep.RequeueJob(job)
    elif action == 'resubmit':
        rep.ResubmitJob(job, job.JobFrames, job.JobFramesPerTask, False)
    elif action == 'delete':
        rep.DeleteJob(job)
        return json.dumps({'delete': True})
    elif action == 'complete':
        rep.CompleteJob(job)

    job = WebServiceUtils.GetJobInfo(job_id)
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

    return json.dumps(obj)
