import { Calendar, momentLocalizer } from "react-big-calendar";
import moment, { Moment } from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Card, CardContent } from "@/components/ui/card";

// Use moment() to create a moment instance
const localizer = momentLocalizer(moment as unknown  as Moment);

export default function PersonalCalendar() {
  // Mock events - replace with actual data fetching logic
  const events = [
    {
      title: "Meeting",
      start: new Date(2023, 5, 15, 10, 0),
      end: new Date(2023, 5, 15, 11, 0),
    },
    {
      title: "Lunch",
      start: new Date(2023, 5, 16, 12, 0),
      end: new Date(2023, 5, 16, 13, 0),
    },
  ];

  return (
    <Card>
      <CardContent className="p-4">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 350 }}
          views={["month"]}
          defaultView="month"
          components={{
            dateCellWrapper: ({
              children,
              value,
            }: {
              children: React.ReactNode;
              value: Date;
            }) => {
              const isCurrentMonth = moment(value).isSame(moment(), "month");
              const isToday = moment(value).isSame(moment(), "day");
              return (
                <div
                  className={`${isCurrentMonth ? "" : "rbc-off-range-bg"} ${
                    isToday ? "font-bold" : ""
                  }`}
                >
                  {children}
                </div>
              );
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
