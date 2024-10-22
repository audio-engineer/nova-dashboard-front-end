import type { ReactElement } from "react";
import { auth } from "@/auth";
import OrderGrid from "@/components/client/order-grid";
import Heatmap from "@/components/client/heatmap";
import Spinner from "@/components/client/spinner";

const Dashboard = async (): Promise<ReactElement | null> => {
  const session = await auth();

  if (undefined === session?.user) {
    return <Spinner />;
  }

  return (
    <>
      <div>Hello, {session.user.email}!</div>
      <OrderGrid />
      <Heatmap />
    </>
  );
};

export default Dashboard;
