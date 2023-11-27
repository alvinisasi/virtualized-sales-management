import axios from "axios"

export const getAllSales = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_URL_API;

    if (!apiUrl) {
        throw new Error('NEXT_PUBLIC_URL_API is not defined in the environment variables.');
    }
    return await axios.get(apiUrl)
}