import { ServiceHour } from "@/types/service.type";

export type FormattedServiceHour = {
  day: string;
  hours: string;
  closed: boolean;
};

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const formatTime = (time: string) => {
  const [hours, minutes] = time.split(":");
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${displayHour}:${minutes} ${ampm}`;
};

export const formatServiceHours = (
  serviceHours: ServiceHour[],
): FormattedServiceHour[] => {
  return DAYS.map((day, index) => {
    const hour = serviceHours.find((h) => h.day_of_week === index);

    if (!hour || hour.is_closed) {
      return { day, hours: "", closed: true };
    }

    return {
      day,
      hours: `${formatTime(hour.from_time)} - ${formatTime(hour.to_time)}`,
      closed: false,
    };
  });
};
