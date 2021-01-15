import { Module } from '@nestjs/common';
import { EventGateway } from './event.gateway';

@Module({
    imports: [],
    controllers: [],
    providers: [EventGateway],
    exports: []
})
export class EventsModule {}
