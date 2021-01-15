import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from './events/events.module';
import { UserEntity } from './user/entity/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'mariadb',
            host: process.env.DATABASE_HOST,
            port: Number.parseInt(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_SCHEME,
            entities: [UserEntity],
            synchronize: true
        }),
        ChatModule,
        AuthModule,
        UserModule,
        EventsModule
    ],
    controllers: [],
    providers: []
})
export class AppModule {}
