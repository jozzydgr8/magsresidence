import { Calendar } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { Apartment } from "../../../types";

type CalendarDisplayProps = {
  currentApartment: Apartment;
};

export const CalendarDisplay = ({
  currentApartment,
}: CalendarDisplayProps) => {

  const isDateBooked = (date: Dayjs) => {
    const selectedDate = date.startOf("day");

    return (
      currentApartment.bookedDates?.some(
        (booking) => {
          const checkIn = dayjs(
            booking.checkIn
          ).startOf("day");

          const checkOut = dayjs(
            booking.checkOut
          ).startOf("day");

          return (
            selectedDate.isSame(
              checkIn,
              "day"
            ) ||
            selectedDate.isSame(
              checkOut,
              "day"
            ) ||
            (
              selectedDate.isAfter(
                checkIn,
                "day"
              ) &&
              selectedDate.isBefore(
                checkOut,
                "day"
              )
            )
          );
        }
      ) ?? false
    );
  };

  const dateCellRender = (
    date: Dayjs
  ) => {
    const booked = isDateBooked(date);

    if (!booked) {
      return null;
    }

    return (
      <div
        style={{
          backgroundColor: "#ffe5e5",
          color: "#d32f2f",
          borderRadius: "4px",
          width: "100%",
          height: "100%",
          minHeight: "24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "12px",
          fontWeight: 600,
        }}
      >
        Booked
      </div>
    );
  };

  return (
    <Calendar
      cellRender={(current) =>
        dateCellRender(current as Dayjs)
      }
    />
  );
};
