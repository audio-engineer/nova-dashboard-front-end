import type { ReactElement } from "react";
import { auth } from "@/auth";
import Spinner from "@/components/client/spinner";
import Home from "@/components/client/home";

const Dashboard = async (): Promise<ReactElement | null> => {
  const session = await auth();

  if (undefined === session?.user) {
    return <Spinner />;
  }

  return (
    <>
      <div>Hello, {session.user.email}!</div>
      <Home />
    </>
  );
};

export default Dashboard;
