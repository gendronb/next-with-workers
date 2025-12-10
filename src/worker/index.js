import dotenv from 'dotenv'

import { PgBoss } from 'pg-boss'

import { logger } from './logger'
import { jobs } from './jobs'

dotenv.config() // Charge les .env si en local

async function bootstrap() {
  logger.info('🚀 Démarrage du Worker...')

  const boss = new PgBoss({
    connectionString: process.env.DATABASE_URL,
    application_name: 'nextjs-worker'
  })

  boss.on('error', (error) => logger.error(error))

  await boss.start()
  logger.info('✅ PgBoss connecté et démarré.')

  const queue = 'send-email'
  await boss.createQueue(queue)

  // Enregistrement dynamique des jobs
  for (const job of jobs) {
    await boss.work(job.queueName, job.options || {}, job.handler)
    logger.info(`Registered job queue: ${job.queueName}`)
  }

  logger.info(`Worker prêt. ${jobs.length} files d'attente actives.`)

  // --- GRACEFUL SHUTDOWN ---
  const shutdown = async (signal) => {
    logger.info(`Signal ${signal} reçu. Arrêt gracieux en cours...`)
    
    try {
      // Dit à pg-boss d'arrêter de prendre de nouveaux jobs
      // et attend que les jobs en cours finissent
      await boss.stop() 
      logger.info('🛑 Worker arrêté proprement.')
      process.exit(0)
    } catch (err) {
      logger.error({ err }, 'Erreur lors de l\'arrêt.')
      process.exit(1)
    }
  }

  process.on('SIGTERM', () => shutdown('SIGTERM'))
  process.on('SIGINT', () => shutdown('SIGINT'))
}

bootstrap().catch((err) => {
  logger.fatal({ err }, 'Le Worker a crashé au démarrage')
  process.exit(1)
})