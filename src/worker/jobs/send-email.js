
import { logger } from '../logger'

export const sendEmailJob = {
  queueName: 'send-email',
  handler: async (job) => {

    try {
      logger.info({ jobId: job.id }, 'Début envoi email')
      const random = Math.random()
      if (random > 0.5) {
        throw new Error('Shit')
      }
      logger.info({ jobId: job.id }, 'Email envoyé avec succès')
    } catch (error) {
      logger.error({ jobId: job.id, error }, 'Échec envoi email')
      throw error
    }
  }

}