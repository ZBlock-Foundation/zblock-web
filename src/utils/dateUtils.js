import moment from "moment";

const DATE_FORMAT = "DD-MM-YYYY";

export const addMonth = (month) => {
  if (month <= 0) {
    return moment().format(DATE_FORMAT);
  }
  return moment().add(month, "M");
};
