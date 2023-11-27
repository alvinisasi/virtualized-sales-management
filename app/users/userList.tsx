"use client"

import DragButton from "@/components/dragButton";
import VirtualizedTable from "@/components/virtualizedTable"
import { getAllUsers } from "@/services/users"
import { ColumnHeaderProps, UsersData } from "@/types";
import { Box, Grid, GridItem, Text } from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { DraggableData, DraggableEvent } from "react-draggable";
import AutoSizer from "react-virtualized-auto-sizer";

const columnHeaders: ColumnHeaderProps[] = [
    { label: 'id', width: 150 },
    { label: 'name', width: 150 },
    { label: 'email', width: 100 },
    { label: 'country_name', width: 150 },
    { label: 'device_id', width: 125 },
    { label: 'bitcoin_address', width: 175 },
    { label: 'avatar', width: 125 },
    { label: 'login_ip', width: 125 },
    { label: 'active_device_mac', width: 200 },
    { label: 'notes', width: 125 },
    { label: 'age', width: 125 },
    { label: 'referral_id', width: 125 },
    { label: 'locale', width: 125 },
    { label: 'favorite_music', width: 150 },
    { label: 'phone_number', width: 150 },
    { label: 'twitter_username', width: 200 },
    { label: 'job', width: 125 },
    { label: 'invoice_email_address', width: 200 },
    { label: 'hmac_secret', width: 125 },
    { label: 'favorite_quote', width: 150 },
    { label: 'primary_color', width: 150 },
    { label: 'secondary_color', width: 175 },
    { label: 'material', width: 125 },
    { label: 'shipping_address', width: 175 },
    { label: 'zip_code', width: 125 },
    { label: 'latitude', width: 125 },
    { label: 'longitude', width: 125 },
    { label: 'favorite_animal', width: 175 },
    { label: 'app_version', width: 125 },
    { label: 'timezone', width: 125 },
];

const getUsers = async () => {
    const users = await getAllUsers()
    const data = users.data.data as UsersData[]
    return data
}

const UserList: React.FC = () => {
    const [columnHeadersData, setColumnHeadersData] = useState(columnHeaders)
    const { data } = useQuery({
        queryKey: ["users"],
        queryFn: () => getUsers(),
    })

    const dragHandler = (e: DraggableEvent, data: DraggableData, index: number) => {
        let dataColumn = [...columnHeadersData]
        dataColumn[index] = {
            label: dataColumn[index].label,
            width: data.x
        }

        setColumnHeadersData(dataColumn)
    }

    return(
        <Box w='100%' h='100%'>
            <AutoSizer style={{ margin: '4px'}}>
                {({ height, width }) => (
                    <Box w={width} h={height}>
                        <Grid templateColumns={`repeat(${columnHeadersData.length}, 1fr)`} m={'4px'} w={width}>
                            {
                                columnHeadersData?.map((item, index) => (
                                    <GridItem key={item.label} w={item.width} border='1px solid #222' display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' paddingX={4}>
                                        <Text mr='8px'>{item.label}</Text>
                                        <DragButton onDrag={(e, data) => dragHandler(e, data, index)} />
                                    </GridItem>
                                ))
                            }
                        </Grid>
                        {data && 
                        <VirtualizedTable headerData={columnHeadersData} data={data} height={height} width={width} />}
                    </Box>
                )}
            </AutoSizer>
        </Box>
    )

}

export default UserList