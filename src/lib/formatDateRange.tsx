import moment from "moment";

const formatDateRange = (startDate: Date, endDate: Date) => {
  const start = moment(startDate);
  const end = moment(endDate);

  if (start.month() === end.month() && start.year() === end.year()) {
    return `${start.format("D")}-${end.format("D MMMM YYYY")}`;
  } else if (start.year() === end.year()) {
    return `${start.format("D MMMM")} - ${end.format("D MMMM YYYY")}`;
  }
  return `${start.format("D MMMM YYYY")} - ${end.format("D MMMM YYYY")}`;
};

export default formatDateRange;
