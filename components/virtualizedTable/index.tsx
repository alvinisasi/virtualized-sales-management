'use client'
import { ColumnHeaderProps, SalesData, UsersData } from "@/types";
import { Box, Text } from "@chakra-ui/react";
import React, { CSSProperties, useEffect, useRef } from "react";
import { VariableSizeGrid as Grid, VariableSizeGrid } from "react-window";

interface VirtualizedTableProps {
    headerData: ColumnHeaderProps[];
    data: SalesData[] | UsersData[] | any;
    height: number;
    width: number;
}

interface CellProps {
    data: SalesData[] | UsersData[] | any;
    style: CSSProperties;
    rowIndex: number;
    columnIndex: number;
    headerData: ColumnHeaderProps[];
}

const Cell = ({ columnIndex, rowIndex, style, data, headerData }: CellProps) =>{ 
    let content = data[rowIndex][headerData[columnIndex].label]
    
    return (
        <Box style={{ ...style, border: "1px solid #222", padding: 8 }} w={'100%'} overflow={"hidden"} textOverflow={'ellipsis'}>
            <Text>{content}</Text>
        </Box>
    )
}

const VirtualizedTable: React.FC<VirtualizedTableProps> = ({ headerData, data, height, width }) => {    
    const ref = useRespondToColumnChange();

    function useRespondToColumnChange() {
        const ref = useRef<VariableSizeGrid>()
        useEffect(() => {
            if (ref.current) {
                
                ref.current.resetAfterColumnIndex(0, true)
                ref.current.resetAfterIndices({
                    columnIndex: 0,
                    rowIndex: 0,
                    shouldForceUpdate: true
                })
            }
        }, [headerData]);
        
        return ref;
    }
    return(
        <Grid
            className="Grid"
            columnCount={headerData.length}
            columnWidth={(index: number) => headerData[index].width}
            height={height}
            rowCount={data.length}
            rowHeight={() => 35}
            width={width}
            itemData={data}
            ref={ref as React.RefObject<VariableSizeGrid>}
        >
            {({ columnIndex, rowIndex, style }) => {
                
                return(
                <Cell 
                    columnIndex={columnIndex}
                    rowIndex={rowIndex}
                    style={style}
                    data={data}
                    headerData={headerData}
                />
            )}}
        </Grid>
    )
}

export default VirtualizedTable