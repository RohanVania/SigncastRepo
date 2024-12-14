import { apiCaller } from "../apiconnector"


export const fetchFiles = async () => {
    const response = await apiCaller("Get", "/api/files");
    // console.log(response)
    if (!response.data) {
        throw new Error("Failed to fetch files");
    }
    return response?.data || []; // Ensure a fallback to an empty array.
};

export const SaveCanvasFile = async (Filedata: string, FileId: string) => {
    try {
        const response = await apiCaller('POST', '/api/file/create', {
            data: Filedata,
            FileId: FileId
        })

        return response.data;

    } catch (err) {
        console.log("Seomthing went wrong", err);
        return {
            status: 'error',
            err: err
        }
    }

}

// * Comment
export const FetchParticularFileById = async (id: string) => {
    try {
        const response = await apiCaller('GET', `/api/file/${id}`);
        console.log(response)
        return response.data
    }
    catch (err) {
        console.log(err);
        return {
            status: 'error',
            err: err
        }
    }
}