import { useQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { fetchFiles } from '../operations/APIfunctions/FilesOperation'
import { Button } from '@nextui-org/react';
import { AiFillAlipayCircle } from "react-icons/ai";
import { Link } from 'react-router-dom';

function DashboardPage() {

    const sideBarRef = useRef(null);
    useEffect(() => {
        // console.log(sideBarRef.current);
    }, [])

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['Files'],
        queryFn: fetchFiles
    })

    const sampleData = [{ id: '1', name: "file1" }, { id: '2', name: 'File2' }]
    // console.log(data);
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    const files = data?.data || [];

    return (
        <div>
            {sampleData.length === 0
                ?
                <div>
                    Nothing Found in Files Create a File
                </div>
                :
                <div className='flex'>
                    <div className='bg-red-400 w-[110px] min-h-[100vh]' ref={sideBarRef}>
                        <div className='bg-yellow-300 text-center py-2 relative flex justify-center items-center'>
                            <AiFillAlipayCircle className='text-[50px] cursor-pointer' />
                        </div>
                        <div className=' pt-5 flex justify-center items-cente '>
                            <ul className='flex flex-col gap-3'>
                                {files.map((file: any) => (
                                    <li key={file.id}>
                                        <Button
                                        >
                                            <Link to={`/file/${file.id}`}>
                                                {file.name}
                                            </Link>
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className='bg-pink-400 flex-1 pl-[40px]'>asd</div>
                </div>
            }
        </div >
    )
}

export default DashboardPage
