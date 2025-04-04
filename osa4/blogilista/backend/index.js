const app = require('./App') // varsinainen Express-sovellus
const config = require('./utils/config')
const logger = require('./utils/logger')


const PORT = config.PORT
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})