import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import promBundle from 'express-prom-bundle'
import {getDBConnectionPool} from './dbconnection.js'
import {initSchema} from './schema.js'
import {getFewProducts, createProduct} from './sampleProducts.js'

const metricsMiddleware = promBundle({
    includeMethod: true, 
    includePath: true, 
    includeStatusCode: true, 
    includeUp: true,
    promClient: {
        collectDefaultMetrics: {}
    },
    metricsPath: "/metrics"
});
const app = express()
app.use(morgan('short'))
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(metricsMiddleware)

const pool = getDBConnectionPool()
initSchema(pool).then(() => {
  console.log("DB schema applied");
}).catch((err) => {
  console.error("error while creating db tables", err)
  process.exit(-1)
})

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.post('/products',async (req, res) => {
  const body = req.body
  await createProduct(body, pool)
  res.send("OK")  
})

app.get('/products', async (req, res) => {
  const products = await getFewProducts(pool)
  res.send(products)
})

app.listen(3000)