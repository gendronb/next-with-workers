const pg = require('serverless-postgres')

const client = new pg({ connectionString: process.env.DATABASE_URL })

export default client