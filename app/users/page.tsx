import Header from "@/components/header"
import { getAllUsers } from "@/services/users"
import { UsersData } from "@/types";
import getQueryClient from "@/utils/getQueryClient";
import { Box } from "@chakra-ui/react"
import UserList from "./userList";
import { dehydrate } from '@tanstack/query-core';
import { HydrationBoundary } from "@tanstack/react-query";

const getUsers = async () => {
    const users = await getAllUsers()
    const data = users.data.data as UsersData[]
    return data
}

const UsersPage = async () => {
    const queryClient = getQueryClient()
    await queryClient.prefetchQuery({queryKey: ['users'], queryFn: getUsers})
    const dehydratedState = dehydrate(queryClient)

    return(
        <HydrationBoundary state={dehydratedState}>
            <Box w="100%" h='70vh'>
                <Header title="Users Dashboard" description="List of Users" />
                <UserList />
            </Box>
        </HydrationBoundary>
    )
}

export default UsersPage