import { PgBoss } from 'pg-boss'

const boss = new PgBoss(process.env.DATABASE_URL)
// Singleton pattern pour éviter de multiples connexions en dev
let started = false

const OPTIONS = {
  retryLimit: 5
}

export async function sendEmailJob(email, body) {
  if (!started) {
    await boss.start()
    started = true
  }
  const result = await boss.send('send-email', { email, body }, OPTIONS)
  return result
}

const GET = async () => {
  const result = await sendEmailJob('Test', 'message')
  return Response.json({ data: 'OK', data: result })
}

export {
  GET
}