import type { ReactElement } from "react";
import { auth } from "@/auth";
import Spinner from "@/components/client/spinner";
import BarChart from "@/components/client/bar-chart";
import Calendar from "@/components/client/calendar";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Dashboard = async (): Promise<ReactElement | null> => {
  const session = await auth();

  if (undefined === session?.user) {
    return <Spinner />;
  }

  return (
    <>
      <div>Hello, {session.user.email}!</div>

      <Grid container alignItems="center">
        <Grid size={0.75}>
          <IconButton aria-label="back" size="large">
            <ArrowBackIosNewIcon fontSize="inherit" />
          </IconButton>
        </Grid>
        <Grid size={10.5}>
          <div style={{ position: "relative", width: "100%", height: "550px" }}>
            <BarChart />
          </div>
        </Grid>
        <Grid size={0.75}>
          <IconButton aria-label="forward" size="large">
            <ArrowForwardIosIcon fontSize="inherit" />
          </IconButton>
        </Grid>
        <Grid size={12}>
          <div style={{ position: "relative", width: "100%", height: "250px" }}>
            <Calendar />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
