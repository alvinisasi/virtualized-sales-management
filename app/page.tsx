import Header from "@/components/header";
import { getAllSales } from "@/services/sales";
import { SalesData } from "@/types";
import getQueryClient from "@/utils/getQueryClient";
import { Box } from "@chakra-ui/react";
import { dehydrate } from "@tanstack/query-core";
import { HydrationBoundary } from "@tanstack/react-query";
import SalesList from "./salesList";

const getSales = async () => {
  const sales = await getAllSales()
  const data = sales.data.data as SalesData[]
  return data
}

const Home: React.FC = async () => {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({ queryKey: ['sales'], queryFn: getSales })
  const dehydratedState = dehydrate(queryClient)
  
  return(
    <HydrationBoundary state={dehydratedState}>
      <Box w="100%" h='80vh'>
        <Header title="Sales Dashboard" description="List of Sales"/>
        <SalesList />
      </Box>
    </HydrationBoundary>
  )
}

export default Home