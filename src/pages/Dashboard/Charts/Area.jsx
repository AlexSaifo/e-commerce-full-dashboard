import React from "react";

import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  DateTime,
  Legend,
  SplineAreaSeries,
  Tooltip
} from "@syncfusion/ej2-react-charts";

import {
  areaCustomSeries,
  areaPrimaryXAxis,
  areaPrimaryYAxis,
} from "../../../data/dummy";
import { Header } from "../../../components/Dashboard";
import { useSelector } from "react-redux";

const Area = () => {
  const { currentMode } = useSelector(state=>state.ui);

  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <Header category="Chart" title="Inflation Rate In Percentage" />
      <div className="w-full">
        <ChartComponent
          id="area-chart"
          height="420px"
          primaryXAxis={areaPrimaryXAxis}
          primaryYAxis={areaPrimaryYAxis}
          //chartArea={{border:{width:0}}}
          tooltip={{ enable: true }}
          background={currentMode === "Dark" ? "#33373E" : "#fff"}
          legendSettings={{ background: 'white' }}
        >
          <Inject services={[Legend, DateTime, SplineAreaSeries , Tooltip]} />
          <SeriesCollectionDirective>
            {areaCustomSeries.map((item, idx) => (
              <SeriesDirective key={idx} {...item} />
            ))}
          </SeriesCollectionDirective>
        </ChartComponent>
      </div>
    </div>
  );
};

export default Area;
