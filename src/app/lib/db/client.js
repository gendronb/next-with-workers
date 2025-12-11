const spg = require('serverless-postgres')

const client = new spg({ 
  connectionString: `${process.env.DATABASE_URL}&uselibpqcompat=true`
})

export default client