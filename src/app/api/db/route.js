import client from '@/app/lib/db/client'

const GET = async () => {
  await client.connect()
  const result = await client.query('SELECT * FROM project')
  await client.clean()

  return Response.json({ data: 'OK', env: process.env.TEST, data: result.rows })
}

export {
  GET
}