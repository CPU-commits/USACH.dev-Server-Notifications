import { registerAs } from '@nestjs/config'

enum NodeEnv {
    'dev',
    'prod',
}

export default registerAs('config', () => {
    const nodeEnv = process.env.NODE_ENV as keyof typeof NodeEnv
    return {
        node_env: nodeEnv,
        redis: {
            host: process.env.REDIS_HOST,
            user: process.env.REDIS_USER,
            pass: process.env.REDIS_PASS,
            port: parseInt(process.env.REDIS_PORT),
        },
        client_domain: process.env.CLIENT_DOMAIN,
        http: process.env.HTTP_MS,
    }
})
