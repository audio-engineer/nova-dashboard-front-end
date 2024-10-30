"use client";

import { ResponsiveHeatMap } from "@nivo/heatmap";
import type { ReactElement } from "react";

const tempData = [
  {
    id: "Monday",
    data: [
      {
        x: "6 am",
        y: 12,
      },
      {
        x: "7 am",
        y: 5,
      },
      {
        x: "8 am",
        y: 4,
      },
      {
        x: "9 am",
        y: 3,
      },
      {
        x: "10 am",
        y: 1,
      },
      {
        x: "11 am",
        y: 6,
      },
      {
        x: "12 pm",
        y: 5,
      },
      {
        x: "13 pm",
        y: 0,
      },
      {
        x: "14 pm",
        y: 1,
      },
      {
        x: "15 pm",
        y: 0,
      },
      {
        x: "16 pm",
        y: 0,
      },
    ],
  },
  {
    id: "Tuesday",
    data: [
      {
        x: "6 am",
        y: 5,
      },
      {
        x: "7 am",
        y: 5,
      },
      {
        x: "8 am",
        y: 4,
      },
      {
        x: "9 am",
        y: 1,
      },
      {
        x: "10 am",
        y: 2,
      },
      {
        x: "11 am",
        y: 2,
      },
      {
        x: "12 pm",
        y: 1,
      },
      {
        x: "13 pm",
        y: 0,
      },
      {
        x: "14 pm",
        y: 0,
      },
      {
        x: "15 pm",
        y: 0,
      },
      {
        x: "16 pm",
        y: 0,
      },
    ],
  },
  {
    id: "Wednesday",
    data: [
      {
        x: "6 am",
        y: 4,
      },
      {
        x: "7 am",
        y: 5,
      },
      {
        x: "8 am",
        y: 3,
      },
      {
        x: "9 am",
        y: 2,
      },
      {
        x: "10 am",
        y: 2,
      },
      {
        x: "11 am",
        y: 1,
      },
      {
        x: "12 pm",
        y: 1,
      },
      {
        x: "13 pm",
        y: 0,
      },
      {
        x: "14 pm",
        y: 2,
      },
      {
        x: "15 pm",
        y: 0,
      },
      {
        x: "16 pm",
        y: 0,
      },
    ],
  },
  {
    id: "Thursday",
    data: [
      {
        x: "6 am",
        y: 2,
      },
      {
        x: "7 am",
        y: 2,
      },
      {
        x: "8 am",
        y: 0,
      },
      {
        x: "9 am",
        y: 0,
      },
      {
        x: "10 am",
        y: 2,
      },
      {
        x: "11 am",
        y: 2,
      },
      {
        x: "12 pm",
        y: 1,
      },
      {
        x: "13 pm",
        y: 0,
      },
      {
        x: "14 pm",
        y: 0,
      },
      {
        x: "15 pm",
        y: 1,
      },
      {
        x: "16 pm",
        y: 0,
      },
    ],
  },
  {
    id: "Friday",
    data: [
      {
        x: "6 am",
        y: 1,
      },
      {
        x: "7 am",
        y: 5,
      },
      {
        x: "8 am",
        y: 1,
      },
      {
        x: "9 am",
        y: 0,
      },
      {
        x: "10 am",
        y: 1,
      },
      {
        x: "11 am",
        y: 0,
      },
      {
        x: "12 pm",
        y: 2,
      },
      {
        x: "13 pm",
        y: 0,
      },
      {
        x: "14 pm",
        y: 1,
      },
      {
        x: "15 pm",
        y: 2,
      },
      {
        x: "16 pm",
        y: 1,
      },
    ],
  },
  {
    id: "Saturday",
    data: [
      {
        x: "6 am",
        y: 4,
      },
      {
        x: "7 am",
        y: 5,
      },
      {
        x: "8 am",
        y: 9,
      },
      {
        x: "9 am",
        y: 4,
      },
      {
        x: "10 am",
        y: 4,
      },
      {
        x: "11 am",
        y: 4,
      },
      {
        x: "12 pm",
        y: 5,
      },
      {
        x: "13 pm",
        y: 2,
      },
      {
        x: "14 pm",
        y: 1,
      },
      {
        x: "15 pm",
        y: 0,
      },
      {
        x: "16 pm",
        y: 0,
      },
    ],
  },
  {
    id: "Sunday",
    data: [
      {
        x: "6 am",
        y: 0,
      },
      {
        x: "7 am",
        y: 5,
      },
      {
        x: "8 am",
        y: 3,
      },
      {
        x: "9 am",
        y: 1,
      },
      {
        x: "10 am",
        y: 3,
      },
      {
        x: "11 am",
        y: 7,
      },
      {
        x: "12 pm",
        y: 3,
      },
      {
        x: "13 pm",
        y: 0,
      },
      {
        x: "14 pm",
        y: 2,
      },
      {
        x: "15 pm",
        y: 0,
      },
      {
        x: "16 pm",
        y: 0,
      },
    ],
  },
];

const Heatmap = (): ReactElement => {
  return (
    <ResponsiveHeatMap
      data={tempData}
      margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
      forceSquare={false}
      xInnerPadding={0.05}
      yInnerPadding={0.05}
      borderRadius={6}
      axisTop={{
        tickSize: 5,
        tickPadding: 5,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
      }}
      colors={{
        type: "sequential",
        scheme: "blues",
      }}
      emptyColor="#555555"
      inactiveOpacity={1}
      legends={[
        {
          anchor: "bottom",
          translateX: 0,
          translateY: 30,
          length: 400,
          thickness: 8,
          direction: "row",
          tickPosition: "after",
          tickSize: 5,
          tickSpacing: 4,
          tickOverlap: false,
          titleAlign: "start",
          titleOffset: 4,
        },
      ]}
      /* eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types */
      tooltip={({ cell }) => {
        return (
          <div
            style={{
              background: "white",
              padding: "9px 12px",
              border: "1px solid #ccc",
            }}
          >
            <div>
              {cell.formattedValue} sale(s) on {cell.serieId}s at {cell.data.x}
            </div>
          </div>
        );
      }}
    />
  );
};

export default Heatmap;
