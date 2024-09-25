import { Server } from 'socket.io';
import { ExtendedSocket, UserSocket } from '../../Domain/Interface/ExtendSocket';

class SocketIoController {
    private users: UserSocket = {};
    private io: Server | null = null;

    listenSocketEvent = (io: Server) => {
        try {
            this.io = io;
            io.on('connection', (socket: ExtendedSocket) => {
                // console.log(`A user connected with id:::: ${socket.id}`)
                // console.log(socket.user)
                this.users[socket.user?.userId as string] = socket.id as string
                // console.log(this.users)
                // socket.emit('notification', 'Something message')
        
                socket.on('disconnect', () => {
                    console.log('User disconnected')
                    delete this.users[socket.user?.userId as string]
                    // console.log(this.users)
                })
            });
        }
        catch (error: any) {
            console.error(error.message);
        }
    }

    sendNotification = (title: string, message: string, userId: string) => {
        try {
            if (!this.io) throw new Error('Socket instance not initialized');
            const socketId = this.users[userId];
            if (socketId) 
                this.io.to(socketId).emit('notification', { title, message })
            //if user is not connected, don't send notification
        }
        catch (error: any) {
            console.error(error.message);
        }
    }
}

export default new SocketIoController() 