import React from "react";
import {
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  Resize,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";
import { scheduleData } from "../../data/dummy";
import { Header } from "../../components/Dashboard";

const Calendar = () => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-secondary-dark-bg">
      <Header category="Inner Pages" title="Calender" />
      <ScheduleComponent
        eventSettings={{ dataSource: scheduleData }}
        selectedDate={new Date(2021, 0, 10)}
      >
        <Inject
          services={[Day, Month, Week, Agenda, Resize, DragAndDrop, WorkWeek]}
        />
      </ScheduleComponent>
    </div>
  );
};

export default Calendar;
