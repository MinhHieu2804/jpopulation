import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./chart.css";

export default function Chart({ props, cities }) {
  // const [data, setdata] = useState([])
  const [colors, setColors] = useState([]);

  function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    if (color === "#FFFFFF") {
      return getRandomColor();
    }
    return color;
  }

  useEffect(() => {
    for (var i = 0; i < 47; i++) {
      setColors((arr) => [...arr, getRandomColor()]);
    }
  }, []);

  return (
    <div style={{ width: "100%", height: 400 }}>
      {/* {JSON.stringify(data)} */}
      <ResponsiveContainer>
        <LineChart
          width={500}
          height={300}
          data={props}
          margin={{
            top: 50,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid horizontal="true" vertical="" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />(
          {cities.map((prop) => (
            <Line
              type="monotone"
              dataKey={prop.name}
              strokeWidth={3}
              stroke={colors[prop.id]}
            ></Line>
          ))}
          )
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
