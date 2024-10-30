"use client";

import { ResponsiveBar } from "@nivo/bar";
import type { ReactElement } from "react";

const data = [
  {
    day: "Monday",
    drinks: 162,
    bread: 88,
    pastry: 53,
    wine: 163,
    coffee: 121,
    other: 108,
  },
  {
    day: "Tuesday",
    drinks: 72,
    bread: 143,
    pastry: 180,
    wine: 160,
    coffee: 92,
    other: 117,
  },
  {
    day: "Wednesday",
    drinks: 74,
    bread: 43,
    pastry: 20,
    wine: 125,
    coffee: 115,
    other: 30,
  },
  {
    day: "Thursday",
    drinks: 13,
    bread: 127,
    pastry: 53,
    wine: 47,
    coffee: 124,
    other: 96,
  },
  {
    day: "Friday",
    drinks: 10,
    bread: 58,
    pastry: 103,
    wine: 15,
    coffee: 152,
    other: 75,
  },
  {
    day: "Saturday",
    drinks: 37,
    bread: 132,
    pastry: 64,
    wine: 37,
    coffee: 146,
    other: 44,
  },
  {
    day: "Sunday",
    drinks: 135,
    bread: 40,
    pastry: 157,
    wine: 93,
    coffee: 13,
    other: 112,
  },
];

const BarChart = (): ReactElement => {
  return (
    <ResponsiveBar
      data={data}
      enableTotals={false}
      layout="horizontal"
      keys={["drinks", "bread", "pastry", "wine", "coffee", "other"]}
      indexBy="day"
      margin={{ top: 60, right: 90, bottom: 90, left: 90 }}
      padding={0.3}
      innerPadding={2}
      borderRadius={6}
      enableGridX={true}
      enableGridY={false}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      /* eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types */
      tooltip={({ value, id, indexValue }) => {
        return (
          <div
            style={{
              background: "white",
              padding: "9px 12px",
              border: "1px solid #ccc",
            }}
          >
            <div>
              {value} {id} sold {indexValue}
            </div>
          </div>
        );
      }}
      colors={{ scheme: "pastel1" }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 70,
          itemsSpacing: 50,
          itemWidth: 50,
          itemHeight: 20,
          itemDirection: "left-to-right",
          symbolSize: 20,
        },
      ]}
    />
  );
};

export default BarChart;
