import type { PropsWithChildren, ReactElement } from "react";
import MainContainer from "@/components/server/main-container";

const Dashboard = ({
  children,
}: Readonly<PropsWithChildren>): ReactElement | null => {
  return <MainContainer>{children}</MainContainer>;
};

export default Dashboard;
