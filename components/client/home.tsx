"use client";

import type { ReactElement } from "react";
import { useState } from "react";
import BarChart from "@/components/client/bar-chart";
import Heatmap from "@/components/client/heatmap";
import OrderGrid from "@/components/client/order-grid";
import Calendar from "@/components/client/calendar";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Home = (): ReactElement => {
  const components = [
    <BarChart key="first" />,
    <Heatmap key="second" />,
    <OrderGrid key="third" />,
  ];

  const InitialPointer = 0;
  const MinPointer = 0;
  const PointerIncrement = 1;

  const [pointer, setPointer] = useState(InitialPointer);

  const backComponents = (): void => {
    if (pointer > MinPointer) {
      setPointer(pointer - PointerIncrement);
    }
  };

  const forwardComponents = (): void => {
    if (pointer < components.length - PointerIncrement) {
      setPointer(pointer + PointerIncrement);
    }
  };

  return (
    <>
      <Grid container alignItems="center">
        <Grid size={0.75}>
          <IconButton
            aria-label="back"
            size="large"
            onClick={() => {
              backComponents();
            }}
          >
            <ArrowBackIosNewIcon fontSize="inherit" />
          </IconButton>
        </Grid>
        <Grid size={10.5}>
          <div style={{ position: "relative", width: "100%", height: "550px" }}>
            {components[pointer]}
          </div>
        </Grid>
        <Grid size={0.75}>
          <IconButton
            aria-label="forward"
            size="large"
            onClick={() => {
              forwardComponents();
            }}
          >
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

export default Home;
