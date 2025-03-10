import React from "react";

import {
  ChartComponent,
  LineSeries,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  DateTime,
  Legend,
  Tooltip,
} from "@syncfusion/ej2-react-charts";

import {
  lineCustomSeries,
  LinePrimaryXAxis,
  LinePrimaryYAxis,
} from "../../../data/dummy";
import { useSelector } from "react-redux";
const LineChart = () => {

  const {currentMode} = useSelector(state => state.ui);

  return (
    <ChartComponent
      id="line-chart"
      height="420px"
      primaryXAxis={LinePrimaryXAxis}
      primaryYAxis={LinePrimaryYAxis}
      //chartArea={{border:{width:0}}}
      tooltip={{enable:true}}
      background={currentMode === 'Dark' ? '#33373E' : '#fff'}
      legendSettings={{ background: 'white' }}
    >
      <Inject services={[Legend, Tooltip, DateTime, LineSeries]} />
      <SeriesCollectionDirective
      >
        {lineCustomSeries.map((item, idx) => (
          <SeriesDirective key={idx} {...item} />
        ))}
      </SeriesCollectionDirective>
    </ChartComponent>
  );
};

export default LineChart;
