import React, { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

export const SocketIoContext = React.createContext<Socket | null | undefined>(null);

type SocketIoProviderProps = React.PropsWithChildren<{}>;

export function SocketIoProvider({ children }: SocketIoProviderProps) {
    const [socketConnection, setSocketConnection] = useState<Socket | null>(null);

    useEffect(() => {
        // Ensure the socket connection is only established once
        if (!socketConnection) {
            const newSocket = io('http://localhost:3005', {
                withCredentials: true,
            });
            setSocketConnection(newSocket);
        }

        return () => {
            // Clean up the socket connection on unmount
            if (socketConnection) {
                socketConnection.disconnect();
            }
        };
    }, []); // Empty dependency array ensures this effect runs only once

    return (
        <SocketIoContext.Provider value={socketConnection}>{children}</SocketIoContext.Provider>
    );
}

export default SocketIoProvider;