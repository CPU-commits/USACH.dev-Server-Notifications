import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import config from './config'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

async function bootstrap() {
    // Config
    const configService = config()
    // App
    const app = await NestFactory.create(AppModule)
    // Microservices
    app.connectMicroservice<MicroserviceOptions>({
        transport: Transport.REDIS,
        options: {
            host: configService.redis.host,
            port: configService.redis.port,
            password: configService.redis.pass,
            username: configService.redis.user,
            db: 0,
        },
    })
    await app.startAllMicroservices()

    await app.listen(5000)
}
bootstrap()
