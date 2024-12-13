//  Api Caller Instance

import axios from "axios"


const axiosInstance = axios.create({
    baseURL: 'http://localhost:3005'
})

//* Api Connector 
export const apiCaller = (method: any, url: string, bodyData?: any, header?: any, params?: any) => {
    return axiosInstance({
        method: `${method}`,
        url: `${url}`,
        headers: header ? header : null,
        data: bodyData ? bodyData : null,
        params: params ? params : null,
        withCredentials: true
    })
}


export default axiosInstance;



