import { Job } from 'pg-boss'

import { sendEmailJob } from './send-email'

export const jobs = [
    sendEmailJob
]