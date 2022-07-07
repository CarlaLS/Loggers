require('dotenv').config()
const cluster = require ('cluster')

const logger  = require('./logger/logger');
const app =require('./server')
require('./database');

const modoCluster = process.argv[3] == 'CLUSTER'

/* --------------------------------------------------------------------------- */
/* MASTER */
const cpus =require('os')
if(modoCluster && cluster.isPrimary) {
    const numCPUs = require('os').cpus().length
    // const numCPUs = os.cpus().length

    
    logger.info(`Número de procesadores: ${numCPUs}`)
    logger.info(`PID MASTER ${process.pid}`)

    for(let i=0; i<numCPUs; i++) {
        cluster.fork()
    }

    cluster.on('exit', worker => {
        logger.info('Worker', worker.process.pid, 'died', new Date().toLocaleString())
        cluster.fork()
    })
} else {

    app.get('/', (req, res) => {
        const primes = []
        const max = Number(req.query.max) || 1000
        for (let i = 1; i <= max; i++) {
            if (isPrime(i)) primes.push(i)
        }
        res.json(primes)
    })  

  const PORT = process.env.PORT || 8080
  
  const server = app.listen(PORT, () => {
  logger.info(`Server running on: http://localhost:${server.address().port}/ - PID(${process.pid})`)
})
server.on('error', (error) => logger.error(`Server error: ${error}`))



}
function isPrime(num) {
    if ([2, 3].includes(num)) return true;
    else if ([2, 3].some(n => num % n == 0)) return false;
    else {
        let i = 5, w = 2;
        while ((i ** 2) <= num) {
            if (num % i == 0) return false
            i += w
            w = 6 - w
        }
    }
    return true
}



