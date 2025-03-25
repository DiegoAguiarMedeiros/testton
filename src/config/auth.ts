
const authConfig = {
  secret: process.env.TESTTON_APP_SECRET,
  tokenExpiryTime: '24h',
  redisServerPort: process.env.TESTTON_REDIS_PORT || 6379,
  redisServerURL: process.env.TESTTON_REDIS_URL,
  redisConnectionString: process.env.REDIS_URL
}

export { authConfig }