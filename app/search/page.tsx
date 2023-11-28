'use client'

import Header from "@/components/header"
import { getAllUsers } from "@/services/users"
import { UsersData } from "@/types"
import { Box } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import Search from "./search"

const getUsers = async () => {
    const users = await getAllUsers()
    const data = users.data.data as UsersData[]
    return data
}

const SearchPage: React.FC = () => {
    const { data } = useQuery({
        queryKey: ["users"],
        queryFn: () => getUsers(),
    })
    return(
        <Box>
            <Header title="Search Dashboard" description="" />
            { data && <Search data={data} /> }
        </Box>
    )
}

export default SearchPage