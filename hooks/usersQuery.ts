'use client'

import { getAllSales } from "@/services/sales";
import { useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { GetAllSalesResponse, UsersData } from "@/types";

const useAllUsers = <T>(data: UsersData[]) => {
  const queryKey = ["users"];

  const queryFn = async () => {
    const response = await getAllSales();
    return response.data.data as UsersData[]; 
  };

  const options: UseQueryOptions<UsersData[]> = {
    queryKey,
    queryFn,
    initialData: data,
  };

  return useQuery<UsersData[]>(options);
};

export { useAllUsers };
