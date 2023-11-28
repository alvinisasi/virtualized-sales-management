import { DeleteUser, PostUser } from "@/types";
import axios from "axios"

const apiUrl = `${process.env.NEXT_PUBLIC_URL_API}users`;

export const getAllUsers = async () => {
    if (!apiUrl) {
        throw new Error('NEXT_PUBLIC_URL_API is not defined in the environment variables.');
    }
    return await axios.get(apiUrl)
}

export const postUser = async (data: PostUser) => {
    if (!apiUrl) {
        throw new Error('NEXT_PUBLIC_URL_API is not defined in the environment variables.');
    }
    return await axios.post(apiUrl, data)
}

export const deleteUser = async (data: DeleteUser) => {
    if (!apiUrl) {
        throw new Error('NEXT_PUBLIC_URL_API is not defined in the environment variables.');
    }
    return await axios.delete(apiUrl, { params: data })
}