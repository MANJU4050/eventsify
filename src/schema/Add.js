import * as Yup from "yup";
export const addValidation = Yup.object({
  title: Yup.string()
    .max(40, "Must be 40 Characters or Less")
    .required("title required"),
  place: Yup.string()
    .max(15, "Must be 15 Characters or Less")
    .required("place required"),

  startDate: Yup.date().required("start Date  required"),
  endDate: Yup.date()
    .default(null)
    .when(
      "startDate",
      (startDate, yup) =>
        startDate && yup.min(startDate, "End time cannot be before start time")
    ).required("end Date required"),

  price: Yup.number().required("price required"),
});
