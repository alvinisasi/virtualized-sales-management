import { TableContainer, Table } from "@chakra-ui/react"

const TableView =({
    children,
  }: {
    children: React.ReactNode
}) => {
    return(
        <TableContainer>
            <Table __css={{tableLayout: 'fixed', width: 'full'}} >
                {children}
            </Table>
        </TableContainer>
    )
}

export default TableView