import { apiCaller } from "../apiconnector"


export const fetchFiles = async () => {
    const response = await apiCaller("Get", "/api/files");
    // console.log(response)
    if (!response.data) {
        throw new Error("Failed to fetch files");
    }
    return response?.data || []; // Ensure a fallback to an empty array.
};