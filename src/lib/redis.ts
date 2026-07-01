// import { createClient } from 'redis';
// import { REDIS_HOST, REDIS_PORT, REDIS_PASS } from '../utils/constants/env';

// const redisClient = createClient({
//   socket: {
//     host: REDIS_HOST,
//     port: Number(REDIS_PORT),
//   },
//   ...(REDIS_PASS ? { password: REDIS_PASS } : {}),
// });

// redisClient.on('error', (err) => console.error('Redis error:', err));

// redisClient.connect().catch((err) => console.error('Redis connect error:', err));

// export default redisClient;
