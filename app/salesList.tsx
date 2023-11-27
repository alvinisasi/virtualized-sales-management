"use client"

import { getAllSales } from "@/services/sales";
import { ColumnHeaderProps, SalesData } from "@/types";
import { Box } from "@chakra-ui/react"
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AutoSizer from "react-virtualized-auto-sizer";
import { DraggableData, DraggableEvent } from "react-draggable";
import VirtualizedTable from "@/components/virtualizedTable";

const columnHeaders: ColumnHeaderProps[] = [
    { label: 'id', width: 50 },
    { label: 'name', width: 250 },
    { label: 'sales_id', width: 175 },
    { label: 'item_id', width: 150 },
    { label: 'qty', width: 125 },
    { label: 'consumen_name', width: 250 },
    { label: 'transaction_date', width: 275 }
];

const getSales = async () => {
    const sales = await getAllSales()
    const data = sales.data.data as SalesData[]
    return data
  }

const SalesList: React.FC = () => {
    const [columnHeadersData, setColumnHeadersData] = useState(columnHeaders)
    const { data } = useQuery({
        queryKey: ["sales"],
        queryFn: () => getSales(),
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
            <AutoSizer style={{ margin: '4px' }}>
                {({ height, width }) => (
                    <Box w={width} h={height}>
                        {data && 
                        <VirtualizedTable headerData={columnHeadersData} data={data} height={height} width={width} />}
                    </Box>
                )}
            </AutoSizer>
        </Box>
    )
}

export default SalesList