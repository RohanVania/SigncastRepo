import { Button } from '@nextui-org/react';
import { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SocketIoContext } from '../SocketContext';
import ContentPage from './ContentPage';
function FilePage() {
    const { id } = useParams();
    const socket = useContext(SocketIoContext)

    const handleJoinedListener = (data: any) => {
        console.log('Some Other User Joined', data)
    }

    useEffect(() => {
        if (socket) {

            socket.emit('join-room', {
                fileId: id
            })

            socket.on('user-joined', handleJoinedListener)

            return (() => {
                socket.emit('leave-room', {
                    fileId: id,
                });

                socket.removeAllListeners();

            })
        }

    }, [])

    return (
        <div>

            <h2>File ID: {id}</h2>
            <p>Details of file {id} would be shown here.</p>
            <Button>
                <Link to={`/file/content/${id}`}>
                    Content
                </Link>
            </Button>
            <div className='bg-red-400 '>
                <ContentPage FileId={id as string} />
            </div>
        </div>
    );
}

export default FilePage;