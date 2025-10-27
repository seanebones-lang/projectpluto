import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';  // Assuming this is from the auth setup
import { AuthService } from '../auth/auth.service';

@WebSocketGateway({
  cors: {
    origin: '*',  // Adjust for production
  },
})
export class FellowshipGateway {
  @WebSocketServer()
  server: Server;

  constructor(private authService: AuthService) {}

  async handleConnection(client: Socket) {
    try {
      const user = await this.authService.validateSocketUser(client);
      client.data.user = user;  // Attach user to socket
    } catch (error) {
      client.disconnect();
    }
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('joinRoom')
  handleJoinRoom(@MessageBody() room: string, @ConnectedSocket() client: Socket) {
    client.join(room);
    client.emit('joined', `Joined room: ${room}`);
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('sendMessage')
  handleMessage(@MessageBody() message: string, @ConnectedSocket() client: Socket) {
    this.server.to('fellowship').emit('message', {
      user: client.data.user.email,
      message,
    });
  }
}
