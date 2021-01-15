import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { MessageEntity } from './entity/message.entity';

@WebSocketGateway()
export class EventGateway {
    private readonly logger: Logger = new Logger(EventGateway.name);
    private server: Server;

    /**
     * socket client array
     * elements: socket io
     */
    private clients: Array<Socket> = [];

    /**
     * connected user array
     * elements: user's id
     */
    private users: Array<string> = [];

    async afterInit(server: Server) {
        this.server = server;
    }

    async handleConnection(client: Socket) {
        const user = client.handshake.query.userId;
        this.logger.log('new client connected, user is: ' + user);

        this.clients.push(client);
        this.users.push(user);

        // 广播，用户上线
        this.server.emit('sign_in', user);
    }

    async handleDisconnect(client: Socket) {
        const index = this.clients.indexOf(client);
        const user = this.users[index];
        this.logger.log('client disconnected, user is: ' + user);

        this.clients.splice(index, 1);
        this.users.splice(index, 1);
        // 广播,用户下线
        this.server.emit('offline', user);
    }

    @SubscribeMessage('message')
    async handleMessage(client: Socket, payload: MessageEntity): Promise<void> {
        const { to, ...message } = payload;
        message.timestamp = new Date().getTime();
        const index = this.users.indexOf(to);
        client.to(this.clients[index].id).emit('message', message);
    }
}
