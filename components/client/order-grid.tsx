"use client";

import type { ReactElement } from "react";
import { useSession } from "next-auth/react";
import type { QueryKey } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/client/spinner";

const getOrders = async ({
  queryKey,
}: {
  readonly queryKey: QueryKey;
}): Promise<string> => {
  // @ts-expect-error It's challenging to define a query key type
  const [, { token }] = queryKey;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_HOST}/orders`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return (await response.json()) as string;
};

const OrderGrid = (): ReactElement | null => {
  const session = useSession();
  const token = session.data?.user?.accessToken;

  const { isLoading, data } = useQuery({
    queryKey: ["orders", { token }] as const,
    queryFn: getOrders,
    enabled: undefined !== token,
  });

  if (isLoading) {
    return <Spinner invertedColor={false} />;
  }

  return <div>{JSON.stringify(data)}</div>;
};

export default OrderGrid;
