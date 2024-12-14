import { Button } from '@nextui-org/react';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SocketIoContext } from '../SocketContext';
import ContentPage from './ContentPage';
import { FetchParticularFileById } from '../operations/APIfunctions/FilesOperation';
function FilePage() {
    // * Comment
    const { id } = useParams();
    const socket = useContext(SocketIoContext)
    const [fileData,setData]=useState(null);

    const handleJoinedListener = (data: any) => {
        console.log('Some Other User Joined', data)
    }

    const fetchParticularFile = async (id: string) => {
        const result = await FetchParticularFileById(id)
        return result.data
    }

    useEffect(() => {
        fetchParticularFile(id as string)
    }, [])

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