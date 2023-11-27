import { getAllSales } from "@/services/sales";
import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { GetAllSalesResponse, SalesData } from "@/types";

// const useAllSales = <T>(salesData: GetAllSalesResponse<T>) => {
    const useAllSales = <T>(salesData: SalesData[]) => {
  const queryKey = ["sales"];

  const queryFn = async () => {
    const response = await getAllSales();
    return response.data.data as SalesData[]; // Assuming the data property of your API response is an array
  };

  const options: UseQueryOptions<SalesData[]> = {
    queryKey,
    queryFn,
    initialData: salesData, // Assuming salesData has a property 'data' with an array
  };

  return useQuery<SalesData[]>(options);
};

export { useAllSales };
